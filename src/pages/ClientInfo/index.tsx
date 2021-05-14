import React, { useEffect, useState } from "react";
import "./styles.scss";
import api from "../../middlewares/axios";

interface IClientOpportunityRespose {
  opportunities: IClientOpportunity[];
}

interface IClientOpportunity {
  name: string;
  limit: number;
  interest: number;
  term: number;
  isActive: boolean;
}

interface IClientInfoProps {
  email: string;
}

const ClientInfo: React.FC<IClientInfoProps> = ({ email }) => {
  const [opportunities, setOpportunities] = useState<IClientOpportunity[]>([]);

  const getClientOpportunities = async () => {
    const { data } = await api.get<IClientOpportunityRespose>(`/opportunities/${email}`);
    return data;
  };

  useEffect(() => {
    const getClientsList = async () => {
      const items = await getClientOpportunities();
      setOpportunities(items.opportunities);
    };
    getClientsList();
  }, []);

  return <div>{opportunities && opportunities.map(it => it.name)}</div>;
};

export default ClientInfo;
