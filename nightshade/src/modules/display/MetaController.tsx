import React from "react";
import Head from "next/head";
import { NextPage } from "next";

export interface MetaControllerProps {
    title?: string;
    embed?: { hexColor?: string; image?: string };
    owner?: string;
    additionalKeywords?: string[];
    description?: string;
}

export const MetaController: NextPage<MetaControllerProps> = ({
    title = "TTS",
    description = "The Tomatohead Society (TTS) is a Fortnite clan that strongly supports Team Pizza and is always looking for new members like you!",
    owner = "Creeper",
    additionalKeywords = [],
    embed = {
        hexColor: "#ff3f3f",
        image: "https://ttsclan.vercel.app/assets/preview.png",
    },
}) => {
    console.log(description);
    return (
        <Head>
            <meta property="og:locale" content="en-US" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://ttsclan.vercel.app/" />

            <title>{title}</title>
            <meta name="og:title" content={title} />

            <meta name="description" content={description} />
            <meta name="og:description" content={description} />

            <meta name="author" content={owner} />
            <meta
                name="keywords"
                content={`TTS,Dashboard,Fortnite Clan,TTS Clan,Tomatohead,tomatohead society,tomatohead clan${additionalKeywords?.map(
                    (k) => `,${k}`
                )}`}
            />
            <meta name="theme-color" content={embed.hexColor} />

            <meta name="og:type" content="website" />
            <meta name="og:site_name" content="TTS" />
            {embed.image && <meta name="og:image" content={embed.image} />}
            {embed.image && <meta property="twitter:image" content={embed.image} />}

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:site" content="@TheTomatoHeads" />
            <meta property="twitter:site:id" content="@TheTomatoHeads" />
            <meta property="twitter:creator" content="@TheTomatoHeads" />
            <meta property="twitter:creator:id" content="@TheTomatoHeads" />

            <meta name="google-site-verification" content="b1c55Ng4j3VJXfO1MMohWhDDxe4iLPQy_c3DfxSZXq4" />
        </Head>
    );
};
