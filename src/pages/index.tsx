import Head from "next/head";
import { useContext, useEffect } from "react";
import { useSaveTokens } from "../modules/auth/useSaveTokens";
import { HomePage as Home } from "../modules/home/HomePage";
import { WebSocketContext } from "../modules/ws/WebSocketProvider";

const HomePage = () => {
    useSaveTokens();
    const { setConn } = useContext(WebSocketContext);


    // useEffect(() => {
    //     setConn(null);
    // }, [])


    return (
        <>
            <Head>
                <title>TTS</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0" />
                <meta property="og:locale" content="en-US" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://ttsclan.vercel.app/" />
                <meta property="og:site_name" content="TTS" />
                <meta property="og:keywords"
                    content="TTS,Dashboard,Fortnite Clan,TTS Clan,Tomatohead,tomatohead society,tomatohead clan" />
                <meta property="og:title" content="TTS" />
                <meta property="og:description" content="The Tomatohead Society (TTS) is a Fortnite clan that strongly supports Team Pizza and is always looking for new members like you!" />
                <meta property="og:image" content="https://ttsclan.vercel.app/assets/preview.png" />
                <meta name="theme-color" content="#ff3f3f" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:site" content="@TheTomatoHeads" />
                <meta property="twitter:site:id" content="@TheTomatoHeads" />
                <meta property="twitter:creator" content="@TheTomatoHeads" />
                <meta property="twitter:creator:id" content="@TheTomatoHeads" />
                <meta property="twitter:image" content="https://ttsclan.vercel.app/assets/preview.png" />
            </Head>

            <Home />
        </>
    )
}
export default HomePage;
