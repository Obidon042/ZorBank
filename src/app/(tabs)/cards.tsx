import { Pressable, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ZroBankLogo } from "../../components/ZroBankLogo";

const cards = [
  {
    name: "Primary",
    type: "VISA",
    number: "•••• 2048",
    balance: "₦ 25,400.00",
    accent: "bg-[#091E5A]",
    badge: "bg-[#4DA3FF]",
    label: "Savings",
  },
  {
    name: "Travel",
    type: "MASTER",
    number: "•••• 8824",
    balance: "₦ 12,850.00",
    accent: "bg-[#1E293B]",
    badge: "bg-[#FDE68A]",
    label: "Trips",
  },
  {
    name: "Rewards",
    type: "VISA",
    number: "•••• 5571",
    balance: "₦ 8,940.00",
    accent: "bg-[#0B357B]",
    badge: "bg-[#7AC9FF]",
    label: "Cashback",
  },
];

const walletActions = [
  { label: "Send", icon: "↗", route: "/bank-transfer" },
  { label: "Top up", icon: "+", route: "/add-money" },
  { label: "Transfer", icon: "⇄", route: "/bank-transfer" },
] as const;

const stats = [
  { name: "Spent", value: "₦ 45.2k", tone: "text-slate-900" },
  { name: "Incoming", value: "₦ 58.4k", tone: "text-emerald-600" },
  { name: "Savings", value: "₦ 18.7k", tone: "text-blue-600" },
];

export default function CardsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F4F7FB]" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-9 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-5 flex-row items-center justify-between">
          <ZroBankLogo variant="horizontal" size="md" showTagline={false} />

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Add a card"
            onPress={() => router.push("/add-card")}
            className="h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm"
          >
            <Text className="text-lg text-slate-700">+</Text>
          </Pressable>
        </View>

        <View className="mb-4 flex-row items-end justify-between">
          <Text className="text-[30px] font-black text-slate-900">My cards</Text>
          <Pressable onPress={() => router.push("/add-card")}>
            <Text className="text-sm font-bold text-blue-600">Add new card +</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="pb-2"
          className="mb-6"
        >
          {cards.map((card, index) => (
            <View
              key={card.name}
              className={`${card.accent} ${index === 0 ? "mr-5" : "mx-2"} w-[270px] rounded-[30px] p-5 shadow-lg border border-white/10`}
            >
              <View className="mb-7 flex-row items-center justify-between">
                <Text className="text-xs font-bold tracking-wider text-white/80 uppercase">{card.name} Card</Text>
                <ZroBankLogo variant="icon" size={26} />
              </View>

              <View className="mb-5 flex-row items-center gap-2">
                <View className="h-8 w-11 rounded-lg border border-white/40 bg-white/15" />
                <Text className="text-[10px] font-bold tracking-[2px] text-white/40">ZROBANK</Text>
              </View>

              <Text className="text-[11px] text-white/70">Available balance</Text>
              <Text className="mt-1 text-[20px] font-extrabold text-white">{card.balance}</Text>

              <View className="mt-6 flex-row items-center justify-between border-t border-white/10 pt-3">
                <Text className="text-[11px] font-semibold text-white/70">{card.number}</Text>
                <Text className="text-[11px] font-extrabold tracking-wider text-amber-400">{card.type}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View className="mb-5 flex-row gap-3">
          {walletActions.map((action) => (
            <Pressable
              key={action.label}
              onPress={() => router.push(action.route)}
              className="flex-1 items-center rounded-2xl border border-slate-200 bg-white py-4"
            >
              <View className="mb-2 h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF2FF]">
                <Text className="text-xl font-bold text-[#1355D1]">{action.icon}</Text>
              </View>
              <Text className="text-[11px] font-bold text-slate-700">{action.label}</Text>
            </Pressable>
          ))}
        </View>

        <View className="mb-4 rounded-[28px] border border-slate-200 bg-white p-4">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-[18px] font-black text-slate-900">Account summary</Text>
            <Text className="text-xs font-bold text-blue-600">Updated</Text>
          </View>

          <View className="flex-row justify-between gap-2">
            {stats.map((item) => (
              <View key={item.name} className="flex-1 rounded-2xl bg-slate-50 p-3">
                <Text className="text-[11px] text-slate-500">{item.name}</Text>
                <Text className={`mt-2 text-[13px] font-extrabold ${item.tone}`}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="rounded-[28px] border border-slate-200 bg-white p-4">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-[18px] font-black text-slate-900">Recent activity</Text>
            <Pressable onPress={() => router.push("/transaction-history")}>
              <Text className="text-sm font-bold text-blue-600">See all</Text>
            </Pressable>
          </View>

          {[
            { title: "Market Place", date: "Today • 9:41 AM", amount: "-₦ 5,800" },
            { title: "Salary", date: "Yesterday • 8:05 AM", amount: "+₦ 120,000" },
            { title: "Bakery supplies", date: "Mon • 4:20 PM", amount: "-₦ 18,420" },
          ].map((item, index) => (
            <Pressable
              key={item.title}
              accessibilityRole="button"
              onPress={() =>
                router.push({
                  pathname: "/transaction-details",
                  params: {
                    title: item.title,
                    date: item.date,
                    amount: item.amount,
                    type: item.amount.startsWith("+") ? "Received" : "Sent",
                  },
                })
              }
              className={`flex-row items-center py-3 ${index < 2 ? "border-b border-slate-100" : ""}`}
            >
              <View className="mr-3 h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF4FF]">
                <Text className="text-base font-black text-[#1E3A8A]">
                  {item.amount.startsWith("+") ? "↗" : "↘"}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-slate-800">{item.title}</Text>
                <Text className="mt-1 text-xs text-slate-400">{item.date}</Text>
              </View>
              <Text
                className={`text-sm font-extrabold ${item.amount.startsWith("+") ? "text-emerald-600" : "text-slate-800"}`}
              >
                {item.amount}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
