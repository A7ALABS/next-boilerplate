import Head from "next/head";
import React, { useEffect, useState } from "react";

interface IAppMeta {
  url: string;
  title: string;
  description: string;
  image: string;
  tabTitle: string;
  video?: string;
}

const AppMeta = ({ url, title, description, image, video }: IAppMeta) => {
  const DOMAIN = process.env.APP_URL;

  return (
    <>
      <meta name="description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${DOMAIN}${image}`} />
      {video && (
        <meta
          property="og:video"
          content={`https://www.youtube.com/embed/Wrald_EZgDQ`}
        />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={DOMAIN} />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${DOMAIN}${image}`} />
      {video && (
        // <meta name="twitter:player:stream" content={`${DOMAIN}${video}`} />
        <meta
          name="twitter:player"
          content={`https://www.youtube.com/embed/Wrald_EZgDQ`}
        />
      )}
    </>
  );
};

export default AppMeta;
