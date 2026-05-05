import React, { useState, useEffect } from "react";
import { api } from "../../lib/api";
import { CommitteeCard } from "./CommitteeCard";
import { antiRaggingCommitteeData } from "../../data/antiRaggingCommittee";
import { internalComplaintsCommitteeData } from "../../data/internalComplaintsCommittee";
import { aicteApprovalsData } from "../../data/aicteApprovals";
import { grievanceRedressalCellData } from "../../data/grievanceRedressalCell";

export const CommitteesList = ({ filterSlug }) => {
  const [committees, setCommittees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCommittees = async () => {
      setLoading(true);
      setError("");
      const response = await api.getCommittees();
      
      console.log('Committees API response:', response);

      if (!response?.data) {
        const lastError = api.getLastError();
        setCommittees([]);
        setError(lastError?.message || "Failed to fetch committee content.");
        setLoading(false);
        return;
      }
      
      const formatted = response.data.map((committee) => {
        // Handle both Strapi v4 (attributes) and v5 (flat) structures
        const attrs = committee.attributes || committee;
        
        const formattedCommittee = {
          id: committee.id,
          slug: attrs.slug,
          documentId: committee.documentId || attrs.documentId,
          date: attrs.date ? new Date(attrs.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }) : '',
          author: 'MIT Polytechnic',
          title: attrs.title,
          excerpt: attrs.description,
          link:
            attrs.slug === antiRaggingCommitteeData.slug
              ? antiRaggingCommitteeData.route
              : attrs.slug === internalComplaintsCommitteeData.slug
                ? internalComplaintsCommitteeData.route
                : attrs.slug === aicteApprovalsData.slug
                  ? aicteApprovalsData.route
                  : attrs.slug === grievanceRedressalCellData.slug
                    ? grievanceRedressalCellData.route
                    : attrs.slug === "scst"
                      ? "/sc-st-committee"
                      : attrs.slug === "harassment"
                        ? "/sexual-harassment-redressal-committee"
                        : attrs.slug === "disclosure"
                          ? "/mandatory-disclosure"
                          : `/committee-details/${committee.documentId || attrs.documentId || attrs.slug || committee.id}`,
        };
        
        console.log('Formatted committee:', formattedCommittee);
        
        return formattedCommittee;
      });
      
      console.log('Formatted committees:', formatted);
      
      // Filter by slug if provided
      const filteredCommittees = filterSlug 
        ? formatted.filter(c => c.slug === filterSlug)
        : formatted;
      
      setCommittees(filteredCommittees);
      setLoading(false);
    };

    fetchCommittees();
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
              <p>{error}</p>
              <p className="text-muted">This frontend now serves committee content from local static data.</p>
            </div>
          ) : committees.length > 0 ? (
            committees.map((committee) => (
              <div className="col-lg-4" key={committee.id}>
                <CommitteeCard {...committee} />
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No committees found.</p>
            </div>
          )}
        </div>
      </div>
      <div className="td_height_120 td_height_lg_80" />
    </section>
  );
};

export default CommitteesList;
