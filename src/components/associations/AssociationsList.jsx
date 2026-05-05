import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import { getImageUrl } from "../../lib/config";
import { AssociationCard } from "./AssociationCard";
import { fallbackAssociations } from "../../data/associations";
import { culturalAnnualDayPrimaryImage } from "../../data/culturalImages";

export const AssociationsList = ({ filterSlug }) => {
  const [associations, setAssociations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAssociations = async () => {
      setLoading(true);
      setError("");
      const response = await api.getAssociations();
      
      console.log('Associations API response:', response);

      const culturalPhotoImage = culturalAnnualDayPrimaryImage;

      const formattedFromApi = response?.data
        ? response.data.map((association) => {
        // Support both nested and flat local data shapes.
          const attrs = association.attributes || association;

          const slug = attrs.slug;
          const directLink =
            slug === "cultural"
              ? "/associations/cultural"
              : slug === "reading"
                ? "/associations/reading"
                : slug === "quiz"
                  ? "/associations/quiz"
                  : slug === "electoral-literacy"
                    ? "/associations/electoral-literacy"
                    : `/association-details/${association.documentId || attrs.documentId || attrs.slug || association.id}`;

          const formattedAssoc = {
            id: association.id,
            slug,
            documentId: association.documentId || attrs.documentId,
            image:
              (slug === "cultural" ? culturalPhotoImage : null) ||
              getImageUrl(attrs.image) ||
              attrs.imageUrl ||
              fallbackAssociations[0].image,
            date: attrs.date ? new Date(attrs.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            }) : '',
            author: 'MIT Polytechnic',
            title: attrs.title,
            excerpt: attrs.description,
            content: attrs.content || attrs.description,
            link: directLink,
          };

          console.log('Formatted association:', formattedAssoc);

          return formattedAssoc;
        })
        : [];

      const mergedAssociations = [
        ...formattedFromApi,
        ...fallbackAssociations.filter(
          (fallback) => !formattedFromApi.some((item) => item.slug === fallback.slug)
        ).map((fallback) => ({
          ...fallback,
          image:
            fallback.slug === "cultural"
              ? culturalPhotoImage || fallback.image
              : fallback.image,
        })),
      ];

      if (!response?.data) {
        const lastError = api.getLastError();
        setError(lastError?.message || "");
      }

      // Filter by slug if provided
      const filteredAssociations = filterSlug 
        ? mergedAssociations.filter(a => a.slug === filterSlug)
        : mergedAssociations;
      
      setAssociations(filteredAssociations);
      setLoading(false);
    };

    fetchAssociations();
  }, [filterSlug]);

  if (loading) {
    return (
      <section>
        <div className="td_height_120 td_height_lg_80" />
        <div className="container text-center">
          <p>Loading...</p>
        </div>
        <div className="td_height_120 td_height_lg_80" />
      </section>
    );
  }

  return (
    <section>
      <div className="td_height_120 td_height_lg_80" />
      <div className="container">
        <div className="row td_gap_y_30">
          {error ? (
            <div className="col-12 text-center">
              <p className="text-muted">
                Showing local association content from this frontend-only build.
              </p>
            </div>
          ) : null}

          {associations.length > 0 ? (
            associations.map((association) => (
              <div className="col-lg-4" key={association.id}>
                <AssociationCard {...association} />
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No associations found.</p>
            </div>
          )}
        </div>
      </div>
      <div className="td_height_120 td_height_lg_80" />
    </section>
  );
};
