import React from "react";
import { Image, ImageStyle, StyleProp, Text, View, ViewStyle } from "react-native";

export type LogoSize = "xs" | "sm" | "md" | "lg" | "xl" | "hero" | number;

export interface ZroBankLogoProps {
  size?: LogoSize;
  variant?: "icon" | "horizontal" | "badge" | "card-emblem";
  theme?: "light" | "dark";
  showTagline?: boolean;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  containerClassName?: string;
}

const logoSource = require("../../assets/images/logo.png");
const emblemSource = require("../../assets/images/logo-emblem.png");

export function getPixelSize(size: LogoSize): number {
  if (typeof size === "number") return size;
  switch (size) {
    case "xs":
      return 26;
    case "sm":
      return 36;
    case "md":
      return 44;
    case "lg":
      return 56;
    case "xl":
      return 72;
    case "hero":
      return 110;
    default:
      return 44;
  }
}

export function ZroBankLogo({
  size = "md",
  variant = "horizontal",
  theme = "dark",
  showTagline = true,
  style,
  imageStyle,
  containerClassName = "",
}: ZroBankLogoProps) {
  const pixelSize = getPixelSize(size);
  const isLight = theme === "light";

  // Icon only
  if (variant === "icon") {
    return (
      <View
        style={[
          {
            width: pixelSize,
            height: pixelSize,
            borderRadius: Math.round(pixelSize * 0.24),
            overflow: "hidden",
          },
          style,
        ]}
        className={containerClassName}
      >
        <Image
          source={logoSource}
          style={[
            {
              width: "100%",
              height: "100%",
            },
            imageStyle,
          ]}
          resizeMode="contain"
        />
      </View>
    );
  }

  // Card emblem (used on credit/debit cards)
  if (variant === "card-emblem") {
    return (
      <View
        style={[
          {
            height: pixelSize,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          },
          style,
        ]}
        className={containerClassName}
      >
        <View
          style={{
            width: pixelSize,
            height: pixelSize,
            borderRadius: Math.round(pixelSize * 0.24),
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.25)",
          }}
        >
          <Image
            source={logoSource}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </View>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: Math.max(12, Math.round(pixelSize * 0.42)),
                fontWeight: "900",
                color: "#FFFFFF",
                letterSpacing: 0.5,
              }}
            >
              Zro
            </Text>
            <Text
              style={{
                fontSize: Math.max(12, Math.round(pixelSize * 0.42)),
                fontWeight: "900",
                color: "#FACC15",
                letterSpacing: 0.5,
              }}
            >
              Bank
            </Text>
          </View>
        </View>
      </View>
    );
  }

  // Large prominent 3D badge variant (e.g. for Welcome screen / Hero cards)
  if (variant === "badge") {
    const badgeSize = typeof size === "number" ? size : size === "hero" ? 140 : 96;
    return (
      <View
        style={[
          {
            alignItems: "center",
            justifyContent: "center",
          },
          style,
        ]}
        className={containerClassName}
      >
        <View
          style={{
            width: badgeSize,
            height: badgeSize,
            borderRadius: Math.round(badgeSize * 0.25),
            shadowColor: "#0038A8",
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.35,
            shadowRadius: 20,
            elevation: 12,
          }}
        >
          <Image
            source={logoSource}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: Math.round(badgeSize * 0.25),
            }}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }

  // Horizontal variant: Emblem + "ZroBank" + tagline
  const titleSize = Math.max(15, Math.round(pixelSize * 0.42));
  const subtitleSize = Math.max(9, Math.round(pixelSize * 0.23));

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          gap: Math.max(8, Math.round(pixelSize * 0.24)),
        },
        style,
      ]}
      className={containerClassName}
    >
      <View
        style={{
          width: pixelSize,
          height: pixelSize,
          borderRadius: Math.round(pixelSize * 0.24),
          overflow: "hidden",
          shadowColor: isLight ? "#000" : "#0038A8",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.18,
          shadowRadius: 6,
          elevation: 3,
        }}
      >
        <Image
          source={logoSource}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
      </View>
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontSize: titleSize,
              fontWeight: "900",
              letterSpacing: 0.5,
              color: isLight ? "#FFFFFF" : "#0B1F4D",
            }}
          >
            Zro
          </Text>
          <Text
            style={{
              fontSize: titleSize,
              fontWeight: "900",
              letterSpacing: 0.5,
              color: "#EAB308",
            }}
          >
            Bank
          </Text>
        </View>
        {showTagline ? (
          <Text
            style={{
              fontSize: subtitleSize,
              fontWeight: "600",
              letterSpacing: 0.2,
              color: isLight ? "rgba(224, 231, 255, 0.9)" : "#64748B",
              marginTop: 1,
            }}
          >
            Bank Smart. Live Better.
          </Text>
        ) : null}
      </View>
    </View>
  );
}

export default ZroBankLogo;

