import { MdClose } from "react-icons/md"
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

type propsDetalhesImobiliaria = {
    imobiliaria: {
        nome_fantasia: string,
        nome_oficial: string,
        email_imobiliaria: string,
        site_imobiliaria: string,
        contato_imobiliaria: string,
        rua: string,
        bairro: string,
        numero: number,
        cidade: string,
        estado: string,
        latitude: number,
        longitude: number,
    },
    setModal: Function,
}

export function DetalhesImobiliaria ( { imobiliaria, setModal }: propsDetalhesImobiliaria ) {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyCBRfZswUbwtx24MDvyRAKZGVHF3XJweME',
    }) 

    return (
        <div className="fixed z-10 inset-0 h-screen w-full items-center justify-center flex bg-gray-500 bg-opacity-75">
            <div className="bg-white p-14 w-[40rem]">
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-4xl font-bold">Imobiliária</h1>
                    <button onClick={() => setModal(false)} className="text-white text-[20px] bg-red-900 p-2 rounded-md"><MdClose /></button>
                </div>
                <div className="w-full h-full flex flex-col justify-between">
                    <div>
                        <div className="mb-3">
                            <h4 className="text-[18px] font-semibold">Nome Fantasia:</h4>
                            <h2 className="">{imobiliaria.nome_fantasia}</h2>
                        </div>
                        <div className="mb-3">
                            <h4 className="text-[18px] font-semibold">Nome Oficial:</h4>
                            <h2 className="">{imobiliaria.nome_oficial}</h2>
                        </div>
                        <div className="mb-3">
                            <h4 className="text-[18px] font-semibold">Endereço:</h4>
                            <h2 className="">{imobiliaria.rua}, {imobiliaria.numero} - {imobiliaria.bairro} - {imobiliaria.cidade}, {imobiliaria.estado}</h2>
                        </div>
                        <div className="mb-3">
                            <h4 className="text-[18px] font-semibold">Email:</h4>
                            <a href={`mailto:${imobiliaria.email_imobiliaria}`} target="_blank" className="">{imobiliaria.email_imobiliaria}</a>
                        </div>
                        <div className="mb-3">
                            <h4 className="text-[18px] font-semibold">Site:</h4>
                            <a href={`${imobiliaria.site_imobiliaria}`} target="_blank" className="text-blue-700">{imobiliaria.site_imobiliaria}</a>
                        </div>
                        <div className="mb-20">
                            <h4 className="text-[18px] font-semibold">Contato:</h4>
                            <h2 className="">{imobiliaria.contato_imobiliaria}</h2>
                        </div>
                    </div>
                    <div className="flex justify-center">
                    <div className="w-[400px] h-[160px] pt-1">
                            {isLoaded ? (
                            <GoogleMap mapContainerClassName="rounded-xl"
                                mapContainerStyle={{width: '100%', height: '100%'}}
                                center={{
                                lat: imobiliaria.latitude,
                                lng: imobiliaria.longitude
                                }}
                                zoom={16}
                            >
                                <Marker position={{
                                lat: imobiliaria.latitude,
                                lng: imobiliaria.longitude
                                }}/>
                            </GoogleMap>
                            ) : (
                            <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}