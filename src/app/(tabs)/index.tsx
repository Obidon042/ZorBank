import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ZroBankLogo } from "../../components/ZroBankLogo";

const quickActions = [
  { label: "Add money", icon: "+", route: "/add-money" },
  { label: "Bank transfer", icon: "↗", route: "/bank-transfer" },
  { label: "Withdraw", icon: "↙", route: "/withdraw-money" },
] as const;

const transactions = [
  { title: "Coffee House", detail: "Today • 9:41 AM", amount: "-₦ 5,800", mark: "C", type: "debit" },
  { title: "Salary deposit", detail: "Yesterday • 8:05 AM", amount: "+₦ 120,000", mark: "↙", type: "credit" },
  { title: "Bakery supplies", detail: "Mon • 4:20 PM", amount: "-₦ 18,420", mark: "B", type: "debit" },
];

const categories = [
  { name: "Food", percent: "38%", value: "₦ 32.8k", color: "bg-[#3B82F6]" },
  { name: "Travel", percent: "24%", value: "₦ 21.5k", color: "bg-[#14B8A6]" },
  { name: "Health", percent: "18%", value: "₦ 15.3k", color: "bg-[#F59E0B]" },
];

export default function HomeScreen() {
  const [balanceVisible, setBalanceVisible] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-[#F4F7FB]" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-9 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-5 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <ZroBankLogo variant="icon" size={44} />
            <View>
              <Text className="text-xs font-semibold text-slate-500">Good morning,</Text>
              <Text className="text-[22px] font-black tracking-tight text-slate-900">
                Alex Morgan
              </Text>
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open notifications"
            onPress={() => router.push("/notifications")}
            className="relative h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <Text className="text-xl text-slate-700">◌</Text>
            <View className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-blue-600" />
          </Pressable>
        </View>

        <View className="mb-6 overflow-hidden rounded-[30px] bg-[#0A2472] p-5 shadow-lg">
          <View className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-500/20" />
          <View className="absolute -bottom-10 left-10 h-28 w-28 rounded-full bg-amber-400/10" />

          <View className="relative z-10 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <ZroBankLogo variant="icon" size={20} />
              <Text className="text-[11px] font-extrabold tracking-wider text-amber-400">
                ZROBANK ACCOUNT
              </Text>
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={() => setBalanceVisible((value) => !value)}
              className="rounded-full bg-white/15 px-3 py-1.5"
            >
              <Text className="text-[10px] font-bold uppercase text-white">
                {balanceVisible ? "Hide" : "Show"}
              </Text>
            </Pressable>
          </View>

          <Text className="relative z-10 mt-4 text-[34px] font-black tracking-tight text-white">
            {balanceVisible ? "₦ 12,840.50" : "••••••••"}
          </Text>
          <Text className="relative z-10 mt-1 text-xs text-blue-100">
            Available balance • Account ending in 2048
          </Text>

          <View className="relative z-10 mt-5 flex-row items-center justify-between border-t border-white/20 pt-4">
            <View>
              <Text className="text-[11px] text-blue-200">Debit card</Text>
              <Text className="mt-0.5 text-sm font-bold text-white">•••• 2048</Text>
            </View>
            <View className="flex-row items-center gap-1.5 rounded-full bg-white/15 px-3 py-1">
              <View className="h-2 w-2 rounded-full bg-emerald-400" />
              <Text className="text-[11px] font-bold text-white">Active</Text>
            </View>
          </View>
        </View>

        <View className="mb-6 flex-row gap-3">
          {quickActions.map((action) => (
            <Pressable
              key={action.label}
              accessibilityRole="button"
              onPress={() => router.push(action.route)}
              className="flex-1 items-center rounded-2xl border border-slate-200 bg-white py-4"
            >
              <View className="mb-2 h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF2FF]">
                <Text className="text-[22px] font-bold text-[#1355D1]">{action.icon}</Text>
              </View>
              <Text className="text-[11px] font-bold text-slate-700">{action.label}</Text>
            </Pressable>
          ))}
        </View>

        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-[20px] font-black text-slate-900">Spending</Text>
          <Pressable onPress={() => router.push("/(tabs)/activity")}>
            <Text className="text-sm font-bold text-blue-600">This month</Text>
          </Pressable>
        </View>

        <View className="mb-6 rounded-[28px] border border-slate-200 bg-white p-4">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-sm text-slate-500">Total spend</Text>
            <Text className="text-sm font-bold text-slate-900">₦ 86.5k</Text>
          </View>

          <View className="h-2.5 flex-row overflow-hidden rounded-full bg-slate-100">
            <View className="h-full w-[38%] rounded-full bg-[#3B82F6]" />
            <View className="h-full w-[24%] rounded-full bg-[#14B8A6]" />
            <View className="h-full w-[18%] rounded-full bg-[#F59E0B]" />
            <View className="h-full flex-1 rounded-full bg-[#E2E8F0]" />
          </View>

          <View className="mt-4 flex-row gap-2">
            {categories.map((item) => (
              <View key={item.name} className="flex-1 rounded-2xl bg-slate-50 p-3">
                <View className={`mb-2 h-2.5 w-8 rounded-full ${item.color}`} />
                <Text className="text-[11px] font-semibold text-slate-600">{item.name}</Text>
                <Text className="mt-1 text-[12px] font-extrabold text-slate-900">{item.value}</Text>
                <Text className="text-[10px] text-slate-400">{item.percent}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-[20px] font-black text-slate-900">Recent activity</Text>
          <Pressable onPress={() => router.push("/transaction-history")}>
            <Text className="text-sm font-bold text-blue-600">See all</Text>
          </Pressable>
        </View>

        <View className="overflow-hidden rounded-[28px] border border-slate-200 bg-white">
          {transactions.map((transaction, index) => (
            <Pressable
              key={transaction.title}
              accessibilityRole="button"
              onPress={() =>
                router.push({
                  pathname: "/transaction-details",
                  params: {
                    title: transaction.title,
                    date: transaction.detail,
                    amount: transaction.amount,
                    type: transaction.type === "credit" ? "Received" : "Sent",
                  },
                })
              }
              className={`flex-row items-center px-4 py-4 ${
                index < transactions.length - 1 ? "border-b border-slate-100" : ""
              }`}
            >
              <View className="mr-3 h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FF]">
                <Text className="text-base font-black text-[#1E3A8A]">
                  {transaction.mark}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-slate-800">{transaction.title}</Text>
                <Text className="mt-1 text-xs text-slate-400">{transaction.detail}</Text>
              </View>
              <Text
                className={`text-sm font-extrabold ${
                  transaction.type === "credit" ? "text-emerald-600" : "text-slate-800"
                }`}
              >
                {transaction.amount}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
