import React, { useEffect, useState } from "react";

import ClientLogo from "../../assets/client.png";
import "./styles.scss";
import api from "../../middlewares/axios";
import Modal from "../../components/Modal";
import ClientInfo from "../ClientInfo";

interface IClient {
  name: string;
  email: string;
  isActive: boolean;
  phone: string;
  revenue: number;
  agreedTerms: boolean;
}
const IMAGE_ALT = "Client logo";
const ENTER_KEY_1 = 0;
const ENTER_KEY_2 = 13;

const Clients: React.FC = () => {
  const [clients, setClients] = useState<IClient[]>([]);
  const [clientEmail, setClientEmail] = useState<string>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const getClients = async () => {
    const { data } = await api.get<IClient[]>("/users");
    return data;
  };

  useEffect(() => {
    const getClientsList = async () => {
      const items = await getClients();
      const clients = Object.entries(items).map((value) => {
        return value[1];
      });

      setClients(clients);
    };
    getClientsList();
  }, []);

  const handleKeypress = (e: any, clientEmail: string) => {
    if (e.keyCode === ENTER_KEY_1 || ENTER_KEY_2) {
      return renderModal(clientEmail);
    }
    return null;
  };

  const renderModal = (clientEmail: string) => {
    setShowModal(true);
    setClientEmail(clientEmail);
  };

  return (
    <>
      <div className="wrapper">
        <div className="content">
          <ul className="list-clients">
            {clients.map((client) => {
              return (
                <li key={client.email} className="container-client">
                  <img
                    className={`client-image ${client.isActive && "is-active"}`}
                    alt={IMAGE_ALT}
                    src={ClientLogo}
                  />
                  <div
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => handleKeypress(e, client.email)}
                    onClick={() => {
                      renderModal(client.email);
                    }}
                    className="description"
                  >
                    {client.name}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Modal show={showModal} handleClose={() => setShowModal(false)}>
        <ClientInfo email={clientEmail ? clientEmail : ""} />
      </Modal>
    </>
  );
};

export default Clients;
