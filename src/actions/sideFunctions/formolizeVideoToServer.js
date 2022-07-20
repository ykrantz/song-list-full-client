const formolizeVideoToServer = (videoApiDitails) => {
  return {
    title: videoApiDitails?.title,
    artist: videoApiDitails?.author?.name,
    src: videoApiDitails?.url,
    user: JSON.parse(localStorage?.currentUser),
    provider: "youTube",
    img: videoApiDitails?.thumbnails[0].url,
    id: videoApiDitails?.id,
  };
};

export default formolizeVideoToServer;
