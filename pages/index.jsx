import { useEffect, useRef, useState } from "react";

export default function RunawayPage() {
  const playerRef = useRef(null);
  const [isHomeClicked, setIsHomeClicked] = useState(false);

  useEffect(() => {
    const button = document.getElementById("runaway-btn");
    const backBtn = document.getElementById("back-btn");

    if (button) {
      button.addEventListener("mouseover", function (event) {
        var x = Math.random() * (window.innerWidth - button.clientWidth);
        var y = Math.random() * (window.innerHeight - button.clientHeight);
        button.style.left = x + "px";
        button.style.top = y + "px";
      });
    }

    if (backBtn) {
      backBtn.addEventListener("click", function (event) {
        setIsHomeClicked(true);
        if (playerRef.current) {
          playerRef.current.contentWindow.postMessage(
            '{"event":"command","func":"' + "playVideo" + '","args":""}',
            "*",
          );
        }
      });
    }

    if (window.YT) {
      let player;
      window.onYouTubeIframeAPIReady = function () {
        player = new window.YT.Player("ytplayer", {
          events: {
            onStateChange: function (event) {
              if (event.data === window.YT.PlayerState.PLAYING) {
                player.unMute();
              }
            },
          },
        });
      };

      if (!window.YT.Player) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        window.onYouTubeIframeAPIReady();
      }
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "start",
        height: "100vh",
        padding: "20px",
      }}
    >
      <h1>Goiaba?</h1>
      <div style={{ position: "relative", display: "flex", gap: "20px" }}>
        <button
          id="runaway-btn"
          style={{ position: "relative", transition: "top 0.5s, left 0.5s" }}
        >
          NÃO! 😖😖😖
        </button>
        <button id="back-btn">Sim!!! 😍😍😍</button>
      </div>
      {isHomeClicked && (
        <iframe
          id="ytplayer"
          ref={playerRef}
          type="text/html"
          width="640"
          height="360"
          src="https://www.youtube.com/embed/sD4tYw2789k?enablejsapi=1&autoplay=1&mute=0"
          frameBorder="0"
        />
      )}
    </div>
  );
}
