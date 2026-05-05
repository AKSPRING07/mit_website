import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Application render error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            background: "#f8f9fa",
            color: "#212529",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div style={{ maxWidth: "720px", width: "100%" }}>
            <h1 style={{ marginBottom: "12px" }}>Something went wrong</h1>
            <p style={{ marginBottom: "16px" }}>
              The page hit a runtime error while rendering.
            </p>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                background: "#fff",
                border: "1px solid #dee2e6",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              {this.state.error?.stack || this.state.error?.message || "Unknown error"}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
