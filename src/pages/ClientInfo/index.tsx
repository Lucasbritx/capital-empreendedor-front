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
    const { data } = await api.get<IClientOpportunityRespose>(
      `/opportunities/${email}`
    );
    return data;
  };

  useEffect(() => {
    const getClientsList = async () => {
      const items = await getClientOpportunities();
      setOpportunities(items.opportunities);
    };
    getClientsList();
  }, []);

  return (
    <div className="wrapper">
      <ul className="list-items">
        {opportunities.map((item) => {
          return (
            <li className="item" key={item.name}>
              <div>{item.name}</div>
              <div>
                <button>Oi</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ClientInfo;
