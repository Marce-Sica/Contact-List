import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const AddContact = () => {
    const { store, actions } = useContext(Context)

    return (<div className="container mt-5 bg-secondary p-3 rounded">
        <div className="d-flex justify-content-center text-white">
            <h1>Añadir contacto</h1>
        </div>
        <form className="row g-3">
            <div className="col-md-6">
                <label for="full-name" className="form-label text-white">Nombre completo:</label>
                <input type="text" className="form-control" id="full-name" name="full-name" placeholder="Ingrese su nombre completo" />
            </div>
            <div className="col-md-6">
                <label for="email" className="form-label text-white">Email:</label>
                <input type="email" className="form-control" id="email" name="email" placeholder="Ingrese su email" />
            </div>
            <div className="col-12">
                <label for="address" className="form-label text-white">Domicilio:</label>
                <input type="text" className="form-control" id="address" name="address" placeholder="Ingrese su dirección" />
            </div>
            <div className="col-md-6">
                <label for="phone" className="form-label text-white">Número de teléfono:</label>
                <input type="tel" className="form-control" id="phone" name="phone" placeholder="Ingrese su número de teléfono" />
            </div>
            <div className="col-md-12 d-flex align-items-end justify-content-center">
                <button type="button" className="btn btn-primary w-50 mt-4" onClick={async () => {
                    const full_name = document.getElementById("full-name").value;
                    const email = document.getElementById("email").value;
                    const phone = document.getElementById("phone").value;
                    const address = document.getElementById("address").value;

                    const newContact = {
                        full_name,
                        email,
                        phone,
                        address,
                        agenda_slug: "agenda_de_marce",
                    };
                    let { respuestaJson, response } = await actions.useFetch("/apis/fake/contact/", newContact, "POST")
                    if (response.ok) {
                        console.log(response)
                        alert("Contacto cargado con éxito!")
                        
                    }
                    else {
                        alert("Error! datos ingresados incorrectamente");
                        return;
                    }

                    

                    

                    document.getElementById("full-name").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("phone").value = "";
                    document.getElementById("address").value = "";
                }}>Añadir</button>
                <Link to="/" ><button type="button" className="btn btn-danger ms-3">Ir atrás</button></Link>
            </div>


        </form>

    </div>)
}

export default AddContact;