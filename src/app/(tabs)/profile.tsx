import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ZroBankLogo } from "../../components/ZroBankLogo";

const profileOptions = [
  { label: "Personal Information", icon: "◉", route: "/personal-information" },
  { label: "Bank Details", icon: "▣", route: "/(tabs)/cards" },
  { label: "Notifications", icon: "◌", route: "/notifications" },
  { label: "Savings Goals", icon: "◎", route: "/savings-goals" },
  { label: "Beneficiaries", icon: "♧", route: "/beneficiaries" },
  { label: "Security", icon: "⌁" },
  { label: "Help Centre", icon: "?", route: "/help-centre" },
  { label: "Log Out", icon: "↩", route: "/" },
] as const;

export default function ProfileScreen() {
  const [twoStepEnabled, setTwoStepEnabled] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-[#F4F7FB]" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-9 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-6 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <ZroBankLogo variant="icon" size={38} />
            <Text className="text-[28px] font-black text-slate-900">Profile</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Edit personal information"
            onPress={() => router.push("/personal-information")}
            className="h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm"
          >
            <Text className="text-lg text-slate-700">⚙</Text>
          </Pressable>
        </View>

        <View className="mb-6 rounded-[30px] bg-[#0A2472] p-5 shadow-lg border border-white/10">
          <View className="flex-row items-center">
            <View className="mr-4 h-16 w-16 items-center justify-center rounded-2xl bg-white/15 border border-white/20">
              <Text className="text-[26px] font-black text-white">AM</Text>
            </View>

            <View className="flex-1">
              <Text className="text-[20px] font-black text-white">Alex Morgan</Text>
              <Text className="mt-0.5 text-xs text-blue-200">alex.morgan@email.com</Text>
              <View className="mt-1.5 self-start rounded-full bg-emerald-500/20 px-2.5 py-0.5 border border-emerald-400/30">
                <Text className="text-[10px] font-bold text-emerald-300">Verified Member</Text>
              </View>
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/personal-information")}
              className="rounded-full bg-white/15 px-3 py-1.5"
            >
              <Text className="text-[10px] font-bold uppercase text-white">Edit</Text>
            </Pressable>
          </View>

          <View className="mt-5 flex-row justify-between rounded-[22px] bg-white/10 p-3">
            <View>
              <Text className="text-[11px] text-blue-200">Available balance</Text>
              <Text className="mt-1 text-lg font-black text-white">₦ 12,840.50</Text>
            </View>
            <View className="items-end">
              <Text className="text-[11px] text-blue-200">Tier</Text>
              <Text className="mt-1 text-sm font-extrabold text-amber-300">Gold Account</Text>
            </View>
          </View>
        </View>

        <View className="mb-5 rounded-[28px] border border-slate-200 bg-white p-4">
          {profileOptions.map((item, index) => (
            <Pressable
              key={item.label}
              onPress={() => {
                if ("route" in item) {
                  router.push(item.route);
                } else if (item.label === "Security") {
                  setTwoStepEnabled((enabled) => !enabled);
                }
              }}
              className={`flex-row items-center justify-between py-4 ${index < profileOptions.length - 1 ? "border-b border-slate-100" : ""}`}
            >
              <View className="flex-row items-center">
                <View className="mr-3 h-10 w-10 items-center justify-center rounded-2xl bg-[#EEF4FF]">
                  <Text className="text-lg font-black text-[#1E3A8A]">{item.icon}</Text>
                </View>
                <Text className="text-sm font-bold text-slate-800">{item.label}</Text>
              </View>
              <Text className="text-xl text-slate-400">›</Text>
            </Pressable>
          ))}
        </View>

        <View className="rounded-[28px] border border-slate-200 bg-white p-4">
          <Text className="text-lg font-black text-slate-900">Security</Text>
          <Pressable
            accessibilityRole="switch"
            accessibilityLabel="Two-step verification"
            accessibilityState={{ checked: twoStepEnabled }}
            onPress={() => setTwoStepEnabled((enabled) => !enabled)}
            className="mt-4 flex-row items-center justify-between rounded-2xl bg-[#F8FAFC] p-3"
          >
            <View>
              <Text className="text-sm font-bold text-slate-800">2-Step verification</Text>
              <Text className="mt-1 text-xs text-slate-500">
                {twoStepEnabled ? "Enabled for your account" : "Disabled for your account"}
              </Text>
            </View>
            <View className={`h-6 w-11 rounded-full p-1 ${twoStepEnabled ? "bg-emerald-500" : "bg-slate-300"}`}>
              <View className={`h-4 w-4 rounded-full bg-white ${twoStepEnabled ? "ml-5" : ""}`} />
            </View>
          </Pressable>
        </View>

        <View className="mt-8 items-center pb-4">
          <ZroBankLogo variant="badge" size={54} />
          <Text className="mt-2.5 text-base font-black text-slate-900">ZroBank Mobile</Text>
          <Text className="text-xs font-bold text-amber-600">Bank Smart. Live Better.</Text>
          <Text className="mt-1 text-[11px] text-slate-400">Version 1.0.0 (Build 100)</Text>
          <Text className="mt-0.5 text-[10px] text-slate-400">
            Licensed by the Central Bank · All deposits insured
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
