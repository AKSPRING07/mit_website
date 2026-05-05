param(
  [string[]]$Path = @("."),
  [switch]$SkipGitModified
)

Add-Type -AssemblyName System.Drawing

$extensions = @(".jpg", ".jpeg", ".png", ".gif", ".bmp")
$skipDirectories = @(
  ".git",
  "node_modules",
  "dist"
)

function Should-SkipPath {
  param(
    [string]$FullName
  )

  foreach ($directory in $skipDirectories) {
    $segment = [IO.Path]::DirectorySeparatorChar + $directory + [IO.Path]::DirectorySeparatorChar
    if ($FullName.Contains($segment)) {
      return $true
    }
  }

  return $false
}

function Get-JpegCodec {
  return [Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq "image/jpeg" } |
    Select-Object -First 1
}

$root = (Get-Location).Path
$jpegCodec = Get-JpegCodec
$encoder = [Drawing.Imaging.Encoder]::Quality
$quality = 85L
$encoderParameters = New-Object Drawing.Imaging.EncoderParameters(1)
$encoderParameters.Param[0] = New-Object Drawing.Imaging.EncoderParameter($encoder, $quality)

$resolvedTargets = foreach ($target in $Path) {
  Resolve-Path -LiteralPath $target | Select-Object -ExpandProperty Path
}

$modifiedFiles = @{}
if ($SkipGitModified) {
  $gitOutput = git diff --name-only --diff-filter=ACMR 2>$null
  foreach ($relativePath in $gitOutput) {
    if (-not [string]::IsNullOrWhiteSpace($relativePath)) {
      $fullPath = [IO.Path]::GetFullPath((Join-Path $root $relativePath))
      $modifiedFiles[$fullPath] = $true
    }
  }
}

$files = foreach ($target in $resolvedTargets) {
  Get-ChildItem -LiteralPath $target -Recurse -File | Where-Object {
    ($extensions -contains $_.Extension.ToLowerInvariant()) -and
    -not (Should-SkipPath $_.FullName) -and
    -not $modifiedFiles.ContainsKey($_.FullName)
  }
}

$processed = 0
$skipped = 0
$beforeBytes = 0L
$afterBytes = 0L

foreach ($file in $files) {
  try {
    $beforeBytes += $file.Length

    $image = [Drawing.Image]::FromFile($file.FullName)
    try {
      $newWidth = [Math]::Max(1, [int][Math]::Round($image.Width * 0.85))
      $newHeight = [Math]::Max(1, [int][Math]::Round($image.Height * 0.85))

      if ($newWidth -eq $image.Width -and $newHeight -eq $image.Height) {
        $afterBytes += $file.Length
        $skipped++
        continue
      }

      $bitmap = New-Object Drawing.Bitmap($newWidth, $newHeight)
      try {
        $bitmap.SetResolution($image.HorizontalResolution, $image.VerticalResolution)

        $graphics = [Drawing.Graphics]::FromImage($bitmap)
        try {
          $graphics.CompositingQuality = [Drawing.Drawing2D.CompositingQuality]::HighQuality
          $graphics.InterpolationMode = [Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
          $graphics.SmoothingMode = [Drawing.Drawing2D.SmoothingMode]::HighQuality
          $graphics.DrawImage($image, 0, 0, $newWidth, $newHeight)
        }
        finally {
          $graphics.Dispose()
        }

        $tempPath = "$($file.FullName).tmp"
        if ($file.Extension.ToLowerInvariant() -in @(".jpg", ".jpeg") -and $jpegCodec) {
          $bitmap.Save($tempPath, $jpegCodec, $encoderParameters)
        }
        else {
          $bitmap.Save($tempPath, $image.RawFormat)
        }
      }
      finally {
        $bitmap.Dispose()
      }
    }
    finally {
      $image.Dispose()
    }

    Move-Item -LiteralPath "$($file.FullName).tmp" -Destination $file.FullName -Force
    $updatedFile = Get-Item -LiteralPath $file.FullName
    $afterBytes += $updatedFile.Length
    $processed++
  }
  catch {
    Write-Warning "Skipped $($file.FullName): $($_.Exception.Message)"
    $afterBytes += $file.Length
    $skipped++
  }
}

[PSCustomObject]@{
  FilesProcessed = $processed
  FilesSkipped = $skipped
  BytesBefore = $beforeBytes
  BytesAfter = $afterBytes
  SavingsBytes = $beforeBytes - $afterBytes
}
