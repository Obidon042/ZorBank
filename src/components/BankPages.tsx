import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ZroBankLogo } from "./ZroBankLogo";

const transactions = [
  { title: "Bank transfer", type: "Sent", date: "Today • 9:41 AM", amount: "-₦ 5,800", icon: "↗" },
  { title: "Salary credit", type: "Received", date: "Yesterday • 8:05 AM", amount: "+₦ 120,000", icon: "↙" },
  { title: "Netflix", type: "Bills", date: "Mon • 4:20 PM", amount: "-₦ 5,500", icon: "N" },
  { title: "Bakery supplies", type: "Sent", date: "Sun • 11:05 AM", amount: "-₦ 18,420", icon: "B" },
];

function Page({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1 bg-[#F4F7FB]" edges={["top"]}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={footer ? (Platform.OS === "ios" ? "padding" : "height") : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-5 pb-8 pt-4"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-5 flex-row items-center justify-between">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Go back"
              onPress={() => router.back()}
              className="h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm"
            >
              <Text className="text-2xl leading-7 text-slate-700">‹</Text>
            </Pressable>
            <ZroBankLogo variant="icon" size={32} />
          </View>
          <Text className="text-[28px] font-black text-slate-900">{title}</Text>
          <Text className="mb-6 mt-1 text-sm leading-5 text-slate-500">{subtitle}</Text>
          {children}
        </ScrollView>
        {footer ? (
          <View
            className="border-t border-slate-200 bg-white px-5 pt-3"
            style={{ paddingBottom: Math.max(insets.bottom, 12) }}
          >
            {footer}
          </View>
        ) : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  keyboardType?: "default" | "number-pad" | "decimal-pad";
}) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-bold text-slate-700">{label}</Text>
      <TextInput
        accessibilityLabel={label}
        className="h-14 rounded-2xl border border-slate-200 bg-white px-4 text-[15px] text-slate-900"
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        value={value}
      />
    </View>
  );
}

function PrimaryButton({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="mt-2 h-14 items-center justify-center rounded-2xl bg-[#1355D1] active:opacity-80"
    >
      <Text className="text-base font-bold text-white">{title}</Text>
    </Pressable>
  );
}

function Notice({ children }: { children: string }) {
  return (
    <View className="mt-4 rounded-2xl border border-blue-100 bg-[#EAF2FF] p-4">
      <Text className="text-sm leading-5 text-blue-800">{children}</Text>
    </View>
  );
}

function SelectionList({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <View className="mb-5">
      <Text className="mb-3 text-sm font-bold text-slate-700">{label}</Text>
      <View className="gap-2">
        {options.map((option) => (
          <Pressable
            key={option}
            accessibilityRole="radio"
            accessibilityState={{ selected: selected === option }}
            onPress={() => onSelect(option)}
            className={`flex-row items-center justify-between rounded-2xl border p-4 ${
              selected === option
                ? "border-blue-300 bg-[#EEF5FF]"
                : "border-slate-200 bg-white"
            }`}
          >
            <Text className="text-sm font-semibold text-slate-800">{option}</Text>
            <View
              className={`h-5 w-5 items-center justify-center rounded-full border ${
                selected === option ? "border-blue-600 bg-blue-600" : "border-slate-300"
              }`}
            >
              {selected === option ? <View className="h-2 w-2 rounded-full bg-white" /> : null}
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export function AddMoneyPage() {
  const [source, setSource] = useState("Bank Transfer");
  const [amount, setAmount] = useState("10,000");
  const [submitted, setSubmitted] = useState(false);

  return (
    <Page title="Add money" subtitle="Choose a funding source and enter an amount.">
      <SelectionList
        label="Select source"
        options={["Bank Transfer", "Card", "USSD"]}
        selected={source}
        onSelect={setSource}
      />
      <Field
        label="Amount"
        value={amount}
        onChangeText={(value) => {
          setAmount(value);
          setSubmitted(false);
        }}
        placeholder="Enter amount"
        keyboardType="decimal-pad"
      />
      <Text className="-mt-2 mb-4 text-xs text-slate-500">Minimum amount ₦ 500</Text>
      <PrimaryButton title="Continue" onPress={() => setSubmitted(true)} />
      {submitted ? (
        <Notice>
          {amount.trim()
            ? `${source} selected for ₦ ${amount}. This is a demo; no money was moved.`
            : "Enter an amount to continue."}
        </Notice>
      ) : null}
    </Page>
  );
}

export function BankTransferPage() {
  const [bank, setBank] = useState("Access Bank");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [step, setStep] = useState<"form" | "review" | "complete">("form");
  const [error, setError] = useState("");
  const accountValid = /^\d{10}$/.test(accountNumber);
  const numericAmount = Number(amount.replace(/[,\s₦]/g, ""));

  const continueTransfer = () => {
    if (step === "form") {
      if (!accountValid) {
        setError("Enter a valid 10-digit account number.");
        return;
      }
      if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
        setError("Enter an amount greater than zero.");
        return;
      }
      setError("");
      setStep("review");
      return;
    }

    if (step === "review") {
      setStep("complete");
      return;
    }

    router.replace("/(tabs)");
  };

  return (
    <Page
      title="Bank transfer"
      subtitle={
        step === "form"
          ? "Send money securely to a Nigerian bank account."
          : step === "review"
            ? "Check the details before confirming your demo transfer."
            : "Your demo transfer is complete."
      }
      footer={
        <View>
          {error ? (
            <Notice>{error}</Notice>
          ) : null}
          {step === "review" ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => setStep("form")}
              className="mb-2 h-11 items-center justify-center"
            >
              <Text className="text-sm font-bold text-blue-700">Edit details</Text>
            </Pressable>
          ) : null}
          <PrimaryButton
            title={
              step === "form"
                ? "Review transfer"
                : step === "review"
                  ? "Confirm demo transfer"
                  : "Done"
            }
            onPress={continueTransfer}
          />
        </View>
      }
    >
      {step === "form" ? (
        <>
          <SelectionList
            label="Select bank"
            options={["Access Bank", "Zenith Bank", "GTBank", "First Bank"]}
            selected={bank}
            onSelect={(value) => {
              setBank(value);
              setError("");
            }}
          />
          <Field
            label="Account number"
            value={accountNumber}
            onChangeText={(value) => {
              setAccountNumber(value.replace(/\D/g, "").slice(0, 10));
              setError("");
            }}
            placeholder="Enter 10-digit account number"
            keyboardType="number-pad"
          />
          {accountValid ? (
            <View className="-mt-2 mb-4 rounded-xl bg-emerald-50 px-3 py-2">
              <Text className="text-xs font-semibold text-emerald-700">Account number entered</Text>
            </View>
          ) : null}
          <Field
            label="Amount"
            value={amount}
            onChangeText={(value) => {
              setAmount(value);
              setError("");
            }}
            placeholder="₦ 0.00"
            keyboardType="decimal-pad"
          />
          <Field
            label="Payment note (optional)"
            value={note}
            onChangeText={setNote}
            placeholder="What is this transfer for?"
          />
        </>
      ) : step === "review" ? (
        <View className="rounded-[26px] border border-slate-200 bg-white p-5">
          <Text className="mb-4 text-base font-extrabold text-slate-900">Transfer summary</Text>
          {[
            ["Bank", bank],
            ["Account number", `••••••${accountNumber.slice(-4)}`],
            ["Amount", `₦ ${numericAmount.toLocaleString("en-NG")}`],
            ["Payment note", note.trim() || "—"],
          ].map(([label, value], index) => (
            <View
              key={label}
              className={`flex-row justify-between gap-3 py-3 ${
                index < 3 ? "border-b border-slate-100" : ""
              }`}
            >
              <Text className="text-sm text-slate-500">{label}</Text>
              <Text className="flex-1 text-right text-sm font-bold text-slate-800">{value}</Text>
            </View>
          ))}
          <Text className="mt-4 text-xs leading-5 text-slate-500">
            Demo only — confirming will not send money or contact a bank.
          </Text>
        </View>
      ) : (
        <View className="items-center rounded-[26px] border border-slate-200 bg-white p-6">
          <View className="mb-4 h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
            <Text className="text-2xl font-black text-emerald-700">✓</Text>
          </View>
          <Text className="text-xl font-extrabold text-slate-900">Demo transfer complete</Text>
          <Text className="mt-2 text-center text-sm leading-5 text-slate-500">
            ₦ {numericAmount.toLocaleString("en-NG")} to {bank} ••••{accountNumber.slice(-4)}.
            No real money was sent.
          </Text>
        </View>
      )}
    </Page>
  );
}

export function WithdrawMoneyPage() {
  const [account, setAccount] = useState("Main Account •••• 2048");
  const [amount, setAmount] = useState("10,000");
  const [submitted, setSubmitted] = useState(false);

  return (
    <Page title="Withdraw money" subtitle="Move money from your wallet to a linked account.">
      <SelectionList
        label="Select account"
        options={["Main Account •••• 2048", "Savings •••• 8824"]}
        selected={account}
        onSelect={setAccount}
      />
      <Field
        label="Amount"
        value={amount}
        onChangeText={(value) => {
          setAmount(value);
          setSubmitted(false);
        }}
        placeholder="₦ 0.00"
        keyboardType="decimal-pad"
      />
      <View className="mb-4 flex-row gap-2">
        {["₦ 5,000", "₦ 10,000", "₦ 20,000"].map((preset) => (
          <Pressable
            key={preset}
            onPress={() => setAmount(preset.replace("₦ ", ""))}
            className="flex-1 items-center rounded-xl border border-slate-200 bg-white py-3"
          >
            <Text className="text-xs font-bold text-slate-700">{preset}</Text>
          </Pressable>
        ))}
      </View>
      <PrimaryButton title="Withdraw" onPress={() => setSubmitted(true)} />
      {submitted ? (
        <Notice>
          {amount.trim()
            ? `Withdrawal of ₦ ${amount} from ${account} is a demo only; no money was moved.`
            : "Enter an amount to continue."}
        </Notice>
      ) : null}
    </Page>
  );
}

export function TransactionHistoryPage() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Sent", "Received", "Bills"];
  const filtered =
    filter === "All" ? transactions : transactions.filter((item) => item.type === filter);

  return (
    <Page title="Transaction history" subtitle="Review your recent account activity.">
      <View className="mb-5 flex-row rounded-full bg-white p-1">
        {filters.map((item) => (
          <Pressable
            key={item}
            onPress={() => setFilter(item)}
            className={`flex-1 items-center rounded-full py-3 ${
              filter === item ? "bg-[#EAF2FF]" : ""
            }`}
          >
            <Text className={`text-xs font-bold ${filter === item ? "text-blue-700" : "text-slate-500"}`}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
      <View className="overflow-hidden rounded-[26px] border border-slate-200 bg-white px-4">
        {filtered.map((item, index) => (
          <Pressable
            key={item.title}
            accessibilityRole="button"
            onPress={() =>
              router.push({
                pathname: "/transaction-details",
                params: { title: item.title, date: item.date, amount: item.amount, type: item.type },
              })
            }
            className={`flex-row items-center py-4 ${
              index < filtered.length - 1 ? "border-b border-slate-100" : ""
            }`}
          >
            <View className="mr-3 h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF4FF]">
              <Text className="text-base font-black text-blue-800">{item.icon}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-slate-800">{item.title}</Text>
              <Text className="mt-1 text-xs text-slate-400">{item.type} • {item.date}</Text>
            </View>
            <Text className={`text-sm font-extrabold ${item.amount.startsWith("+") ? "text-emerald-600" : "text-slate-800"}`}>
              {item.amount}
            </Text>
          </Pressable>
        ))}
      </View>
    </Page>
  );
}

export function TransactionDetailsPage() {
  const params = useLocalSearchParams<{
    title?: string;
    date?: string;
    amount?: string;
    type?: string;
  }>();
  const title = typeof params.title === "string" ? params.title : "Bank transfer";
  const date = typeof params.date === "string" ? params.date : "Today • 9:41 AM";
  const amount = typeof params.amount === "string" ? params.amount : "-₦ 5,800";
  const type = typeof params.type === "string" ? params.type : "Sent";

  return (
    <Page title="Transaction details" subtitle="A clear summary of this transaction.">
      <View className="mb-5 items-center rounded-[28px] border border-slate-200 bg-white p-6">
        <View className="mb-4 h-14 w-14 items-center justify-center rounded-full bg-[#EAF2FF]">
          <Text className="text-2xl font-black text-blue-700">{amount.startsWith("+") ? "↙" : "↗"}</Text>
        </View>
        <Text className="text-sm font-semibold text-slate-500">{title}</Text>
        <Text className={`mt-2 text-[28px] font-black ${amount.startsWith("+") ? "text-emerald-600" : "text-slate-900"}`}>
          {amount}
        </Text>
        <Text className="mt-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
          Completed • Demo
        </Text>
      </View>
      <View className="mb-5 rounded-[26px] border border-slate-200 bg-white p-4">
        {[
          ["Transaction type", type],
          ["Date", date],
          ["Reference", "ZB-2048-918276"],
          ["Account", "Main Account •••• 2048"],
          ["Fee", "₦ 0.00"],
        ].map(([label, value], index) => (
          <View key={label} className={`flex-row justify-between py-3 ${index < 4 ? "border-b border-slate-100" : ""}`}>
            <Text className="text-sm text-slate-500">{label}</Text>
            <Text className="max-w-[58%] text-right text-sm font-bold text-slate-800">{value}</Text>
          </View>
        ))}
      </View>
      <View className="mb-6 mt-2 flex-row items-start rounded-2xl border border-blue-200 bg-[#EAF2FF] p-4">
        <View className="mr-3 h-9 w-9 items-center justify-center rounded-full bg-blue-700">
          <Text className="text-sm font-black text-white">i</Text>
        </View>
        <View className="flex-1">
          <Text className="text-sm font-extrabold text-blue-900">Sample transaction</Text>
          <Text className="mt-1 text-sm leading-5 text-blue-800">
            This screen uses example data for the app preview. No real money was transferred.
          </Text>
        </View>
      </View>
    </Page>
  );
}

export function SavingsGoalsPage() {
  const [savedAmount, setSavedAmount] = useState(120000);
  const target = 500000;
  const progress = Math.min(savedAmount / target, 1);

  return (
    <Page title="Savings goals" subtitle="Build healthy habits and stay on track.">
      <View className="mb-5 rounded-[28px] bg-[#0F5BDB] p-5">
        <Text className="text-sm font-semibold text-blue-100">Travel fund</Text>
        <Text className="mt-3 text-[26px] font-black text-white">
          ₦ {savedAmount.toLocaleString("en-NG")}
        </Text>
        <Text className="mt-1 text-xs text-blue-100">of ₦ {target.toLocaleString("en-NG")} goal</Text>
        <View className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/25">
          <View className="h-full rounded-full bg-white" style={{ width: `${progress * 100}%` }} />
        </View>
        <Text className="mt-2 text-right text-xs font-bold text-white">{Math.round(progress * 100)}% saved</Text>
      </View>
      <View className="mb-5 rounded-[26px] border border-slate-200 bg-white p-4">
        <Text className="text-base font-extrabold text-slate-900">Monthly contribution</Text>
        <Text className="mt-1 text-sm text-slate-500">Your next automatic saving is ₦ 10,000</Text>
        <PrimaryButton
          title="Save ₦ 10,000"
          onPress={() => setSavedAmount((current) => Math.min(current + 10000, target))}
        />
      </View>
      <Notice>Demo preview only. Saving here does not move money from your account.</Notice>
    </Page>
  );
}

export function AddCardPage() {
  const [cardType, setCardType] = useState("Virtual card");
  const [cardName, setCardName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <Page title="Add a card" subtitle="Choose the kind of card you want to add.">
      <SelectionList
        label="Card type"
        options={["Virtual card", "Physical card"]}
        selected={cardType}
        onSelect={setCardType}
      />
      <Field
        label="Card name"
        value={cardName}
        onChangeText={(value) => {
          setCardName(value);
          setSubmitted(false);
        }}
        placeholder="e.g. Everyday card"
      />
      <PrimaryButton title="Continue" onPress={() => setSubmitted(true)} />
      {submitted ? (
        <Notice>
          {cardName.trim()
            ? `${cardType} setup for “${cardName.trim()}” is a demo preview.`
            : "Enter a name for your card to continue."}
        </Notice>
      ) : null}
    </Page>
  );
}

export function PersonalInformationPage() {
  const [name, setName] = useState("Alex Morgan");
  const [email, setEmail] = useState("alex.morgan@email.com");
  const [phone, setPhone] = useState("+234 801 234 5678");
  const [saved, setSaved] = useState(false);

  return (
    <Page title="Personal information" subtitle="Keep your contact details up to date.">
      <View className="rounded-[26px] border border-slate-200 bg-white p-4">
        <Field
          label="Full name"
          value={name}
          onChangeText={(value) => {
            setName(value);
            setSaved(false);
          }}
          placeholder="Your full name"
        />
        <Field
          label="Email address"
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            setSaved(false);
          }}
          placeholder="you@example.com"
        />
        <Field
          label="Phone number"
          value={phone}
          onChangeText={(value) => {
            setPhone(value);
            setSaved(false);
          }}
          placeholder="Your phone number"
          keyboardType="number-pad"
        />
        <PrimaryButton title="Save changes" onPress={() => setSaved(true)} />
        {saved ? <Notice>Your changes are saved in this demo session.</Notice> : null}
      </View>
    </Page>
  );
}

export function HelpCentrePage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const questions = [
    ["How do I send money?", "Open Bank Transfer, choose a bank, enter the account details and amount, then review before confirming."],
    ["Can I use this app to move real money?", "No. This is a UI prototype. It is not connected to a bank, payment provider, or real account."],
    ["How do I reset my password?", "From Sign in, choose Forgot password and follow the verification steps shown in the demo."],
  ];

  return (
    <Page title="Help centre" subtitle="Find answers to common questions.">
      <View className="overflow-hidden rounded-[26px] border border-slate-200 bg-white px-4">
        {questions.map(([question, answer], index) => {
          const isExpanded = expanded === question;
          return (
            <Pressable
              key={question}
              accessibilityRole="button"
              accessibilityState={{ expanded: isExpanded }}
              onPress={() => setExpanded(isExpanded ? null : question)}
              className={`py-4 ${index < questions.length - 1 ? "border-b border-slate-100" : ""}`}
            >
              <View className="flex-row items-center justify-between">
                <Text className="flex-1 pr-3 text-sm font-bold text-slate-800">{question}</Text>
                <Text className="text-lg font-bold text-blue-700">{isExpanded ? "−" : "+"}</Text>
              </View>
              {isExpanded ? (
                <Text className="mt-3 pr-6 text-sm leading-5 text-slate-500">{answer}</Text>
              ) : null}
            </Pressable>
          );
        })}
      </View>
      <Notice>
        This is a prototype. Do not enter real banking or personal information.
      </Notice>
    </Page>
  );
}

export function BeneficiariesPage() {
  const [beneficiaries, setBeneficiaries] = useState([
    { name: "John Doe", bank: "Access Bank •••• 5799", initials: "JD" },
    { name: "Mary James", bank: "Zenith Bank •••• 8642", initials: "MJ" },
    { name: "David Wilson", bank: "Access Bank •••• 5949", initials: "DW" },
  ]);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [formError, setFormError] = useState("");

  const addBeneficiary = () => {
    if (!name.trim()) {
      setFormError("Enter the account holder’s name.");
      return;
    }
    if (!/^\d{10}$/.test(account)) {
      setFormError("Enter a valid 10-digit account number.");
      return;
    }
    setBeneficiaries((current) => [
      ...current,
      { name: name.trim(), bank: `Bank account •••• ${account.slice(-4)}`, initials: name.trim().slice(0, 2).toUpperCase() },
    ]);
    setName("");
    setAccount("");
    setAdding(false);
    setFormError("");
  };

  return (
    <Page title="My beneficiaries" subtitle="Manage trusted people and accounts.">
      <View className="mb-5 rounded-[26px] border border-slate-200 bg-white px-4">
        {beneficiaries.map((person, index) => (
          <View key={`${person.name}-${person.bank}`} className={`flex-row items-center py-4 ${index < beneficiaries.length - 1 ? "border-b border-slate-100" : ""}`}>
            <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-[#EAF2FF]">
              <Text className="text-sm font-extrabold text-blue-700">{person.initials}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-slate-800">{person.name}</Text>
              <Text className="mt-1 text-xs text-slate-500">{person.bank}</Text>
            </View>
            <Text className="text-xl text-slate-400">›</Text>
          </View>
        ))}
      </View>
      {adding ? (
        <View className="rounded-[26px] border border-slate-200 bg-white p-4">
          <Text className="mb-4 text-base font-extrabold text-slate-900">Add beneficiary</Text>
          <Field label="Account name" value={name} onChangeText={(value) => { setName(value); setFormError(""); }} placeholder="Full name" />
          <Field label="Account number" value={account} onChangeText={(value) => { setAccount(value.replace(/\D/g, "").slice(0, 10)); setFormError(""); }} placeholder="10-digit account number" keyboardType="number-pad" />
          <PrimaryButton title="Save beneficiary" onPress={addBeneficiary} />
          {formError ? (
            <Text className="mt-3 text-xs text-red-600">{formError}</Text>
          ) : null}
        </View>
      ) : (
        <PrimaryButton title="Add beneficiary" onPress={() => setAdding(true)} />
      )}
    </Page>
  );
}

export function NotificationsPage() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Alerts", "Messages"];
  const items = [
    { title: "Salary credit", detail: "₦ 120,000.00 was added to your account.", date: "Today • 9:41 AM", category: "Alerts", icon: "↙", tone: "text-emerald-600" },
    { title: "Transaction alert", detail: "Your transfer of ₦ 5,800.00 was successful.", date: "Today • 9:30 AM", category: "Alerts", icon: "↗", tone: "text-red-500" },
    { title: "System update", detail: "Your account information is up to date.", date: "Yesterday • 2:10 PM", category: "Messages", icon: "✓", tone: "text-blue-600" },
    { title: "New feature", detail: "Explore your new savings goals.", date: "Mon • 10:00 AM", category: "Messages", icon: "✦", tone: "text-amber-500" },
  ];
  const visible = filter === "All" ? items : items.filter((item) => item.category === filter);

  return (
    <Page title="Notifications" subtitle="Stay up to date with your account.">
      <View className="mb-5 flex-row rounded-full bg-white p-1">
        {filters.map((item) => (
          <Pressable key={item} onPress={() => setFilter(item)} className={`flex-1 items-center rounded-full py-3 ${filter === item ? "bg-[#EAF2FF]" : ""}`}>
            <Text className={`text-xs font-bold ${filter === item ? "text-blue-700" : "text-slate-500"}`}>{item}</Text>
          </Pressable>
        ))}
      </View>
      <View className="overflow-hidden rounded-[26px] border border-slate-200 bg-white px-4">
        {visible.map((item, index) => (
          <View key={item.title} className={`flex-row items-center py-4 ${index < visible.length - 1 ? "border-b border-slate-100" : ""}`}>
            <View className="mr-3 h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF4FF]">
              <Text className={`text-base font-black ${item.tone}`}>{item.icon}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-slate-800">{item.title}</Text>
              <Text className="mt-1 text-xs leading-4 text-slate-500">{item.detail}</Text>
              <Text className="mt-1 text-[10px] text-slate-400">{item.date}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  );
}
