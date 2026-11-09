import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ZroBankLogo } from "../../components/ZroBankLogo";

const tabs = ["All", "Sent", "Received", "Bills"];

const transfers = [
  { name: "Bank transfer", type: "Sent", date: "Today • 9:41 AM", amount: "-₦ 5,800", icon: "⇄" },
  { name: "Salary deposit", type: "Received", date: "Yesterday • 8:05 AM", amount: "+₦ 120,000", icon: "↗" },
  { name: "Bakery supplies", type: "Sent", date: "Mon • 4:20 PM", amount: "-₦ 18,420", icon: "↘" },
  { name: "Freelance invoice", type: "Received", date: "Sun • 11:05 AM", amount: "+₦ 36,500", icon: "↗" },
  { name: "Netflix", type: "Bills", date: "Sat • 10:15 AM", amount: "-₦ 5,500", icon: "N" },
];

export default function ActivityScreen() {
  const [selectedTab, setSelectedTab] = useState("All");
  const visibleTransfers =
    selectedTab === "All"
      ? transfers
      : transfers.filter((transfer) => transfer.type === selectedTab);

  return (
    <SafeAreaView className="flex-1 bg-[#F4F7FB]" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-9 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-5 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <ZroBankLogo variant="icon" size={38} />
            <Text className="text-[28px] font-black text-slate-900">Activity</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open transaction history"
            onPress={() => router.push("/transaction-history")}
            className="h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm"
          >
            <Text className="text-lg text-slate-700">⌕</Text>
          </Pressable>
        </View>

        <View className="mb-5 overflow-hidden rounded-[30px] bg-[#0A2472] p-5 shadow-lg border border-white/10">
          <View className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-500/20" />
          <View className="absolute -bottom-8 left-12 h-24 w-24 rounded-full bg-amber-400/10" />

          <View className="relative z-10 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <ZroBankLogo variant="icon" size={20} />
              <Text className="text-[11px] font-extrabold text-amber-400">ZROBANK INSIGHTS</Text>
            </View>
            <Text className="text-xs font-semibold text-blue-200">₦ 86.5k total spend</Text>
          </View>

          <Text className="relative z-10 mt-4 text-[34px] font-black tracking-tight text-white">
            +₦ 28.4k
          </Text>
          <Text className="relative z-10 mt-1 text-xs text-blue-200">
            Compared with last month
          </Text>
        </View>

        <View className="mb-5 flex-row rounded-full bg-white p-1 shadow-sm shadow-slate-200">
          {tabs.map((tab, index) => (
            <Pressable
              key={tab}
              onPress={() => setSelectedTab(tab)}
              className={`flex-1 items-center rounded-full px-3 py-2.5 ${
                selectedTab === tab ? "bg-[#EAF2FF]" : "bg-transparent"
              }`}
            >
              <Text className={`text-xs font-bold ${selectedTab === tab ? "text-[#1355D1]" : "text-slate-500"}`}>
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="rounded-[30px] border border-slate-200 bg-white p-3">
          {visibleTransfers.map((transfer, index) => (
            <Pressable
              key={`${transfer.name}-${transfer.date}`}
              accessibilityRole="button"
              onPress={() =>
                router.push({
                  pathname: "/transaction-details",
                  params: {
                    title: transfer.name,
                    date: transfer.date,
                    amount: transfer.amount,
                    type: transfer.type,
                  },
                })
              }
              className={`flex-row items-center p-3 ${index < visibleTransfers.length - 1 ? "border-b border-slate-100" : ""}`}
            >
              <View className="mr-3 h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF]">
                <Text className="text-lg font-black text-[#1E3A8A]">{transfer.icon}</Text>
              </View>

              <View className="flex-1">
                <Text className="text-sm font-bold text-slate-800">{transfer.name}</Text>
                <Text className="mt-1 text-xs text-slate-400">{transfer.type} • {transfer.date}</Text>
              </View>

              <Text className={`text-sm font-extrabold ${transfer.amount.startsWith("+") ? "text-emerald-600" : "text-slate-800"}`}>
                {transfer.amount}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
