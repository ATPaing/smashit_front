import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { API_BASE } from "../config/api.js";

import reliabilityIcon from "../assets/reliability_icon.svg";
import gamesIcon from "../assets/games.svg";

const DashMetrices = () => {

    const { token } = useAuth();

    const [metrics, setMetrics] = useState({});
    const [loading, setLoading] = useState(true);
    console.log(metrics)
    useEffect(() => {

        const fetchMetrics = async () => {

            try {

                const response = await fetch(
                    `${API_BASE}/auth/me`,
                    {
                        method: "GET",

                        headers: {
                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message);
                }

                console.log("User Metrics:", data.user);

                setMetrics(data.user);

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);
            }
        };

        fetchMetrics();

    }, [token]);

    if (loading) {
        return (
            <div className="metrics_section">
                <p>Loading metrics...</p>
            </div>
        );
    }

    return (
        <div className="metrics_section">

            <div className="metric_card games_played">

                <div className="metric_icon">
                    <img
                        src={gamesIcon}
                        alt="Games Played"
                    />
                </div>

                <div className="metric_details">

                    <p className="metric_label">
                        TOTAL MATCHES
                    </p>

                    <p className="metric_value">
                        {metrics.totalMatches || 0}
                    </p>

                    <p className="metric_description">
                        Played this season
                    </p>

                </div>
            </div>

            <div className="metric_card reliability">

                <div className="metric_icon">
                    <img
                        src={reliabilityIcon}
                        alt="Reliability"
                    />
                </div>

                <div className="metric_details">

                    <p className="metric_label">
                        RELIABILITY SCORE
                    </p>

                    <p className="metric_value">
                        {metrics.reliabilityScore || 0}%
                    </p>

                    <p className="metric_description">
                        Based on attendance
                    </p>

                </div>
            </div>

        </div>
    );
};

export default DashMetrices;