import {useEffect, useState} from "react";
import styled from "@emotion/styled";
import Error from "./Error.jsx"
import useSelectMonedas from "../hooks/useSelectMonedas.jsx";
import { monedas } from "../data/Monedas.jsx";

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: all .3s ease;
    cursor: pointer;
    margin-top: 30px;
    
    &:hover {
        background-color: #7A7DFE;
        
    }
`
const Formulario = ({ setMonedas }) => {

    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)


    const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas)
    const [ criptomoneda, SelectCriptomoneda ] = useSelectMonedas('Elige tu Criptomoneda', criptos)

    useEffect( () => {
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"

            const response = await fetch(url)
            const result = await response.json()

            const arrayCriptos = result.Data.map( cripto => {

                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }

                return objeto
            })

            setCriptos(arrayCriptos)
        }
        consultarAPI()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        if ([moneda, criptomoneda].includes('')) {
            setError(true)

            return
        }

        setError(false)
        setMonedas({
            moneda,
            criptomoneda
        })
    }

    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}

            <form
                onSubmit={handleSubmit}
            >

                <SelectMonedas />
                <SelectCriptomoneda/>

                <InputSubmit
                    type="submit"
                    value="Cotizar"
                />

            </form>
        </>
    )
}

export default Formulario