import { MdClose } from "react-icons/md"
import { GoogleMap, Marker } from '@react-google-maps/api'
import { isLoaded } from "../../keys"


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

    return (
        <div className="fixed z-30 inset-0 h-screen w-full items-center justify-center flex bg-gray-500 bg-opacity-75 py-3 sm:py-0 px-4 sm:px-0">
            <div className="bg-white px-5 sm:px-14 py-8 sm:py-14 w-full lg:w-[40rem] rounded-lg">
                <div className="flex items-center justify-between mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold">Imobiliária</h1>
                    <button onClick={() => setModal(false)} className="text-white text-[20px] bg-red-900 p-2 rounded-md"><MdClose /></button>
                </div>
                <div className="w-full h-full flex flex-col justify-between">
                    <div>
                        <div className="mb-3">
                            <h4 className="text-[15px] sm:text-[18px] font-semibold">Nome Fantasia:</h4>
                            <h2 className="text-[13px] sm:text-[16px]">{imobiliaria.nome_fantasia}</h2>
                        </div>
                        <div className="mb-3">
                            <h4 className="text-[15px] sm:text-[18px] font-semibold">Nome Oficial:</h4>
                            <h2 className="text-[13px] sm:text-[16px]">{imobiliaria.nome_oficial}</h2>
                        </div>
                        <div className="mb-3">
                            <h4 className="text-[15px] sm:text-[18px] font-semibold">Endereço:</h4>
                            <h2 className="text-[13px] sm:text-[16px]">{imobiliaria.rua}, {imobiliaria.numero} - {imobiliaria.bairro} - {imobiliaria.cidade}, {imobiliaria.estado}</h2>
                        </div>
                        <div className="mb-3">
                            <h4 className="text-[15px] sm:text-[18px] font-semibold">Email:</h4>
                            <a href={`mailto:${imobiliaria.email_imobiliaria}`} target="_blank" className="text-[13px] sm:text-[16px]">{imobiliaria.email_imobiliaria}</a>
                        </div>
                        <div className="mb-3">
                            <h4 className="text-[15px] sm:text-[18px] font-semibold">Site:</h4>
                            <a href={`${imobiliaria.site_imobiliaria}`} target="_blank" className="text-blue-700">{imobiliaria.site_imobiliaria}</a>
                        </div>
                        <div className="mb-8 sm:mb-20">
                            <h4 className="text-[15px] sm:text-[18px] font-semibold">Contato:</h4>
                            <h2 className="text-[13px] sm:text-[16px]">{imobiliaria.contato_imobiliaria}</h2>
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