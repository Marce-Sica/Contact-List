import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

const EditContact = (props) => {
    const params = useParams();
    const { store, actions } = useContext(Context);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [contacto, setContacto] = useState();

    useEffect(() => {
        let funcionCargaContacto = async () => {
            let { respuestaJson, response } = await actions.useFetch(`/apis/fake/contact/${params.contactID}`)
            console.log(respuestaJson)
            setContacto(respuestaJson)
            setFullName(respuestaJson.full_name)
            setEmail(respuestaJson.email)
            setAddress(respuestaJson.address)
            setPhone(respuestaJson.phone)
            setIsLoaded(true)
        }
        funcionCargaContacto()

    }, [])

    useEffect(() => { }, [contacto])

    const handleSubmit = async () => {
        const editedContact = {
            full_name: fullName,
            email,
            phone,
            address,
            agenda_slug: "agenda_de_marce",
        };

        let { respuestaJson, response } = await actions.useFetch(`/apis/fake/contact/${params.contactID}`, editedContact, "PUT");
        if (!response.ok) {
            console.log(response);
            alert("Error");
            return;
        }

        setContacto(editedContact)

        alert("Contacto editado con éxito");
    };

    return (
        <div className="container mt-4 bg-secondary p-3 rounded mt-5">
            <div className="d-flex justify-content-center text-light">
                <h1>Editar contacto:</h1>
            </div>
            <form className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="full-name" className="form-label text-light">Nombre completo:</label>
                    <input type="text" className="form-control" id="full-name" name="full-name" placeholder="Ingrese su nombre completo" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label text-light">Email:</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Ingrese su email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="col-12">
                    <label htmlFor="address" className="form-label text-light">Domicilio:</label>
                    <input type="text" className="form-control" id="address" name="address" placeholder="Ingrese su dirección" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="phone" className="form-label text-light">Número de teléfono:</label>
                    <input type="tel" className="form-control" id="phone" name="phone" placeholder="Ingrese su número de teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="col-md-12 d-flex align-items-end justify-content-center">
                    <button type="button" className="btn btn-primary w-50 mt-4" onClick={handleSubmit}
                    >Editar</button>
                    <Link to="/" ><button type="button" className="btn btn-danger ms-3">Ir atrás</button></Link>
                </div>
            </form>
        </div>
    );
};

export default EditContact;

