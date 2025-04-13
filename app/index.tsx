import { useAssets } from "expo-asset";
import { Link, Redirect } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useVideoPlayer, VideoSource, VideoView } from "expo-video";

const Page = () => {
  const [assets] = useAssets([require("../assets/videos/intro.mp4")]);

  const assetId = require("../assets/videos/intro.mp4");

  const videoSource: VideoSource = {
    assetId,
    metadata: {
      title: "Big Buck Bunny",
      artist: "The Open Movie Project",
    },
  };

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />

      {/* Overlay Content */}
      <View style={styles.overlay}>
        <Text style={styles.header}>Ready to change the way you money?</Text>

        <View style={styles.buttons}>
          <Link
            href="/login"
            asChild
            style={[
              defaultStyles.pillButton,
              { flex: 1, backgroundColor: Colors.dark },
            ]}
          >
            <TouchableOpacity>
              <Text style={styles.buttonTextLight}>Log in</Text>
            </TouchableOpacity>
          </Link>

          <Link
            href="/signup"
            asChild
            style={[
              defaultStyles.pillButton,
              { flex: 1, backgroundColor: "#fff" },
            ]}
          >
            <TouchableOpacity>
              <Text style={styles.buttonTextDark}>Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#000", // fallback
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  header: {
    fontSize: 36,
    fontWeight: "900",
    color: "white",
    textTransform: "uppercase",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  buttonTextLight: {
    color: "white",
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
  },
  buttonTextDark: {
    color: "#000",
    fontSize: 22,
    fontWeight: "500",
    textAlign: "center",
  },
});
