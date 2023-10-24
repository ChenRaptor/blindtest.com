"use client"

import { createContext, useContext, useState, useEffect} from "react";

type CinemaContextType = {cinema: any, setCinema: any}

const CinemaContext = createContext<CinemaContextType>({cinema: null, setCinema: null})

export const useCinema = () => {
    return useContext(CinemaContext);
}

export const CinemaProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    
    const [cinema, setCinema] = useState<any>();

    // Fonction appelé lors de la récupération du fichier Json
    // Crée un nouveau tableau 'aléatoire'
    const createRandom = (jsonDatas:{}) => {
        const dataList = {...jsonDatas} as {[key: string] : any};
        dataList.aleatoire = Object.values(dataList).flatMap((value) => value)

        Object.keys(dataList).forEach((array) => 
            dataList[array] = dataList[array].map((object: any) => object.poster)
        );

        // dataList.aleatoire = Object.values(dataList).flatMap((value) => value)
        return dataList;
    }



    // Fonction qui randomize les poster affichés lorsque le carroussel tourne
    const randomize = (originalObject: {[key: string] : string[]}) => {  

        // Crée un nouvel objet qui contiendras tous les tableaux de posters aléatoires
        const newObject:any = {};

        for (const key in originalObject) {
            const affiches:number[] = [];
            while (affiches.length < 7) {
                const number = Math.floor(Math.random() * originalObject[key].length);
                if (!affiches.includes(number)) {
                    affiches.push(number);
                }
            }

            // Remplie l'objet avec les posters aléatoires
            newObject[key] = affiches.map((index) => originalObject[key][index]);
        }

        setCinema(newObject)
    }



    // Récupère les données du Json au premier chargement du provider
    useEffect(() => {
        async function fetchJson() {
            try {
                const response = await fetch('/database/affiches.json');
                const datas = await response.json();
                // Appel une fonction qui ajoute un tableau aléatoire
                const withRandomCategory = createRandom(datas);
                // Appel la fonction qui randomize les posters à afficher
                randomize(withRandomCategory);
            } catch (error:any) {
                console.error(`Data loading error : ${error.message}`);
            }
        }

        // Appel la fonction au premier chargement du provider
        fetchJson();
    },[])



    return (
        <CinemaContext.Provider value={{ cinema, setCinema }}>
            {children}
        </CinemaContext.Provider>
    )
}