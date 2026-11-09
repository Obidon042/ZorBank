import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ZroBankLogo } from "../components/ZroBankLogo";

const slides = [
  {
    title: "Bank smart.\nLive better.",
    description:
      "Manage your money with an account that keeps up with the way you live.",
    symbol: "Z",
    label: "YOUR MONEY, IN GOOD HANDS",
  },
  {
    title: "Fast & secure\ntransactions",
    description:
      "Send money and pay bills in a few taps, with security built into every step.",
    symbol: "↗",
    label: "MOVE MONEY IN MOMENTS",
  },
  {
    title: "Your security\nis our priority",
    description:
      "Your account is protected with smart safeguards, wherever life takes you.",
    symbol: "✓",
    label: "PROTECTED AROUND THE CLOCK",
  },
];

type FormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

const emptyValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
};

function Brand({ light = false }: { light?: boolean }) {
  return <ZroBankLogo size="md" theme={light ? "light" : "dark"} />;
}

function PrimaryButton({
  label,
  onPress,
  light = false,
}: {
  label: string;
  onPress: () => void;
  light?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={`h-14 items-center justify-center rounded-2xl ${light ? "bg-white" : "bg-blue-700"
        } active:opacity-80`}
    >
      <Text
        className={`text-base font-bold ${light ? "text-blue-700" : "text-white"
          }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function Welcome({ onContinue }: { onContinue: () => void }) {
  return (
    <SafeAreaView className="flex-1 bg-[#052A85]">
      <View className="flex-1 justify-between px-7 pb-5 pt-8">
        <Brand light />
        <View className="items-center">
          <View className="relative mb-9 h-64 w-64 items-center justify-center">
            {/* Ambient background glow */}
            <View className="absolute h-56 w-56 rounded-full bg-blue-500/20 blur-2xl" />

            {/* Glass frame */}
            <View className="h-60 w-60 items-center justify-center rounded-[44px] border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md">
              <ZroBankLogo variant="badge" size={130} />
            </View>

            {/* Floating feature pills */}
            <View className="absolute -bottom-3 -left-2 rounded-full border border-white/30 bg-[#091E5A] px-3.5 py-1.5 shadow-lg">
              <Text className="text-[11px] font-bold text-amber-400">⚡ Bank Smart</Text>
            </View>

            <View className="absolute -right-2 -top-2 rounded-full border border-white/30 bg-[#091E5A] px-3.5 py-1.5 shadow-lg">
              <Text className="text-[11px] font-bold text-emerald-400">✓ Live Better</Text>
            </View>
          </View>

          <Text className="text-center text-4xl font-extrabold leading-tight text-white">
            Banking that{"\n"}moves with you
          </Text>
          <Text className="mt-4 max-w-[290px] text-center text-base leading-6 text-blue-100">
            A simpler, smarter way to take control of your money with ZroBank.
          </Text>
        </View>
        <View>
          <PrimaryButton label="Get started" onPress={onContinue} light />
          <Text className="mt-4 text-center text-xs text-blue-100">
            ZroBank · Bank Smart. Live Better.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function Illustration({
  index,
  symbol,
}: {
  index: number;
  symbol: string;
}) {
  const label =
    index === 0 ? "ZROBANK" : index === 1 ? "INSTANT TRANSFER" : "SECURE ACCOUNT";

  return (
    <View className="h-[270px] w-full items-center justify-center overflow-hidden rounded-[32px] bg-[#EEF5FF]">
      <View className="absolute -right-10 -top-14 h-40 w-40 rounded-full bg-[#DCEAFF]" />
      <View className="absolute -bottom-16 -left-7 h-44 w-44 rounded-full bg-[#E3EDFF]" />
      {index === 0 ? (
        <View className="h-44 w-[260px] rotate-[-6deg] rounded-[24px] bg-[#091E5A] p-5 shadow-xl border border-white/10">
          <View className="flex-row items-center justify-between">
            <ZroBankLogo variant="card-emblem" size={30} theme="light" />
            <Text className="text-[11px] font-black tracking-widest text-amber-400">
              VISA PLATINUM
            </Text>
          </View>
          <View className="mt-7 flex-row items-center gap-2">
            <View className="h-5 w-8 rounded bg-amber-400/80" />
            <Text className="text-[10px] text-blue-200">Debit</Text>
          </View>
          <Text className="mt-3 text-[11px] font-semibold tracking-[3px] text-white">
            ••••  ••••  ••••  2048
          </Text>
        </View>
      ) : (
        <View
          className={`h-36 w-36 items-center justify-center rounded-[42px] ${index === 1 ? "bg-blue-700" : "bg-white"
            }`}
          style={{
            shadowColor: "#0758D6",
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.14,
            shadowRadius: 18,
            elevation: 5,
          }}
        >
          <Text
            className={`text-6xl font-bold ${index === 1 ? "text-white" : "text-blue-700"
              }`}
          >
            {symbol}
          </Text>
        </View>
      )}
      <View className="absolute bottom-5 rounded-full bg-white px-4 py-2">
        <Text className="text-[10px] font-bold tracking-[2px] text-blue-700">
          {label}
        </Text>
      </View>
    </View>
  );
}

function Onboarding({
  slide,
  onNext,
  onSkip,
  onSignIn,
}: {
  slide: number;
  onNext: () => void;
  onSkip: () => void;
  onSignIn: () => void;
}) {
  const item = slides[slide];
  const isLast = slide === slides.length - 1;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pb-5 pt-4">
        <View className="flex-row items-center justify-between">
          <Brand />
          <Pressable
            accessibilityRole="button"
            onPress={onSkip}
            className="rounded-full px-3 py-2"
          >
            <Text className="font-semibold text-slate-500">Skip</Text>
          </Pressable>
        </View>
        <View className="flex-1 justify-center">
          <Illustration index={slide} symbol={item.symbol} />
          <Text className="mt-8 text-xs font-bold tracking-[2px] text-blue-700">
            {item.label}
          </Text>
          <Text className="mt-3 text-[32px] font-extrabold leading-[39px] text-slate-950">
            {item.title}
          </Text>
          <Text className="mt-3 max-w-[340px] text-base leading-6 text-slate-500">
            {item.description}
          </Text>
        </View>
        <View className="gap-7">
          <View className="flex-row items-center justify-center gap-2">
            {slides.map((_, index) => (
              <View
                key={index}
                className={`h-2 rounded-full ${slide === index ? "w-7 bg-blue-700" : "w-2 bg-blue-100"
                  }`}
              />
            ))}
          </View>
          <PrimaryButton
            label={isLast ? "Create an account" : "Continue"}
            onPress={onNext}
          />
          <Pressable
            accessibilityRole="button"
            onPress={onSignIn}
            className="-mt-4 items-center py-1"
          >
            <Text className="text-sm font-semibold text-slate-500">
              Already have an account?{" "}
              <Text className="font-bold text-blue-700">Sign in</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

function AccountField({
  label,
  value,
  placeholder,
  onChangeText,
  keyboardType,
  secureTextEntry,
  error,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  keyboardType?: "default" | "email-address" | "phone-pad";
  secureTextEntry?: boolean;
  error?: string;
}) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-semibold text-slate-700">{label}</Text>
      <TextInput
        accessibilityLabel={label}
        autoCapitalize={
          keyboardType === "email-address" || secureTextEntry ? "none" : "words"
        }
        className={`h-14 rounded-2xl border bg-white px-4 text-[15px] text-slate-900 ${error ? "border-red-400" : "border-slate-200"
          }`}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        secureTextEntry={secureTextEntry}
        value={value}
      />
      {error ? <Text className="mt-1 text-xs text-red-600">{error}</Text> : null}
    </View>
  );
}

function AccountForm({
  onBack,
  onForgotPassword,
  initialSignIn = false,
}: {
  onBack: () => void;
  onForgotPassword: () => void;
  initialSignIn?: boolean;
}) {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [isSignIn, setIsSignIn] = useState(initialSignIn);

  const update = (key: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const submit = () => {
    const nextErrors: Partial<FormValues> = {};
    if (!isSignIn && !values.name.trim()) nextErrors.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!isSignIn && values.phone.trim().length < 7) {
      nextErrors.phone = "Enter a valid phone number.";
    }
    if (values.password.length < 8) {
      nextErrors.password = "Use at least 8 characters.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      router.replace("/(tabs)");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-grow px-6 pb-8 pt-4"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row items-center justify-between">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Back"
              onPress={onBack}
              className="h-11 w-11 items-center justify-center rounded-full bg-slate-100"
            >
              <Text className="text-2xl text-slate-700">‹</Text>
            </Pressable>
            <Brand />
            <View className="w-11" />
          </View>

          <View className="mb-6 mt-10">
            <Text className="text-[32px] font-extrabold leading-[39px] text-slate-950">
              {isSignIn ? "Welcome\nback" : "Create your\naccount"}
            </Text>
            <Text className="mt-3 text-base leading-6 text-slate-500">
              {isSignIn
                ? "Sign in to pick up where you left off."
                : "A few details and you're on your way to smarter banking."}
            </Text>
          </View>

          {!isSignIn ? (
            <AccountField
              error={errors.name}
              label="Full name"
              onChangeText={(value) => update("name", value)}
              placeholder="e.g. Alex Morgan"
              value={values.name}
            />
          ) : null}
          <AccountField
            error={errors.email}
            keyboardType="email-address"
            label="Email address"
            onChangeText={(value) => update("email", value)}
            placeholder="you@example.com"
            value={values.email}
          />
          {!isSignIn ? (
            <AccountField
              error={errors.phone}
              keyboardType="phone-pad"
              label="Phone number"
              onChangeText={(value) => update("phone", value)}
              placeholder="+1 (555) 000-0000"
              value={values.phone}
            />
          ) : null}
          <AccountField
            error={errors.password}
            label="Password"
            onChangeText={(value) => update("password", value)}
            placeholder="At least 8 characters"
            secureTextEntry
            value={values.password}
          />
          {isSignIn ? (
            <Pressable
              accessibilityRole="button"
              onPress={onForgotPassword}
              className="-mt-2 mb-5 self-end py-2"
            >
              <Text className="text-sm font-bold text-blue-700">
                Forgot password?
              </Text>
            </Pressable>
          ) : null}

          <PrimaryButton
            label={isSignIn ? "Sign in" : "Create account"}
            onPress={submit}
          />
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              setIsSignIn((current) => !current);
              setErrors({});
            }}
            className="mt-5 items-center py-2"
          >
            <Text className="text-sm text-slate-500">
              {isSignIn ? "New to ZroBank? " : "Already have an account? "}
              <Text className="font-bold text-blue-700">
                {isSignIn ? "Create account" : "Sign in"}
              </Text>
            </Text>
          </Pressable>
          <Text className="mt-auto pt-8 text-center text-xs leading-5 text-slate-400">
            Prototype preview · No real account or financial data is created.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function ForgotPassword({
  onBack,
  onSendCode,
}: {
  onBack: () => void;
  onSendCode: (email: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    onSendCode(normalizedEmail);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-grow px-6 pb-8 pt-4"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to sign in"
            onPress={onBack}
            className="h-11 w-11 items-center justify-center rounded-full bg-slate-100"
          >
            <Text className="text-2xl text-slate-700">‹</Text>
          </Pressable>

          <View className="mt-12 items-center">
            <View className="mb-6 h-16 w-16 items-center justify-center rounded-3xl bg-[#EAF2FF]">
              <Text className="text-3xl text-blue-700">🔒</Text>
            </View>
            <Text className="text-center text-[28px] font-extrabold text-slate-950">
              Forgot Password?
            </Text>
            <Text className="mt-2 max-w-[300px] text-center text-sm leading-5 text-slate-500">
              No worries. Enter the email linked to your account and we’ll send you a verification code.
            </Text>
          </View>

          <View className="mt-10">
            <AccountField
              error={error}
              keyboardType="email-address"
              label="Email address"
              onChangeText={(value) => {
                setEmail(value);
                setError("");
              }}
              placeholder="you@example.com"
              value={email}
            />
            <PrimaryButton label="Send code" onPress={submit} />
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={onBack}
            className="mt-6 items-center py-2"
          >
            <Text className="text-sm font-bold text-blue-700">Back to sign in</Text>
          </Pressable>
          <Text className="mt-auto pt-8 text-center text-xs leading-5 text-slate-400">
            Prototype preview · No email or verification message is sent.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function OtpVerification({
  email,
  onBack,
  onVerify,
}: {
  email: string;
  onBack: () => void;
  onVerify: () => void;
}) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const codeInput = useRef<React.ElementRef<typeof TextInput>>(null);

  const verify = () => {
    if (code.length !== 6) {
      setError("Enter all 6 digits to continue.");
      return;
    }
    setError("");
    onVerify();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-grow px-6 pb-8 pt-4"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to forgot password"
            onPress={onBack}
            className="h-11 w-11 items-center justify-center rounded-full bg-slate-100"
          >
            <Text className="text-2xl text-slate-700">‹</Text>
          </Pressable>

          <View className="mt-12 items-center">
            <View className="mb-6 h-16 w-16 items-center justify-center rounded-3xl bg-[#EAF2FF]">
              <Text className="text-3xl text-blue-700">✉</Text>
            </View>
            <Text className="text-center text-[28px] font-extrabold text-slate-950">
              Verify Your Account
            </Text>
            <Text className="mt-2 max-w-[310px] text-center text-sm leading-5 text-slate-500">
              Enter the 6-digit code sent to{"\n"}
              <Text className="font-bold text-slate-700">{email}</Text>
            </Text>
          </View>

          <View className="mt-10">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Enter 6-digit verification code"
              onPress={() => codeInput.current?.focus()}
              className="mb-2 flex-row justify-center gap-2"
            >
              {Array.from({ length: 6 }, (_, index) => (
                <View
                  key={index}
                  className={`h-14 w-11 items-center justify-center rounded-xl border ${error ? "border-red-400" : code.length === index ? "border-blue-600" : "border-slate-200"
                    } bg-white`}
                >
                  <Text className="text-xl font-bold text-slate-900">
                    {code[index] ?? ""}
                  </Text>
                </View>
              ))}
            </Pressable>
            <TextInput
              ref={codeInput}
              accessibilityLabel="6-digit verification code"
              autoComplete="one-time-code"
              caretHidden
              keyboardType="number-pad"
              maxLength={6}
              onChangeText={(value) => {
                setCode(value.replace(/\D/g, "").slice(0, 6));
                setError("");
                setNotice("");
              }}
              style={{ height: 1, width: 1, opacity: 0 }}
              textContentType="oneTimeCode"
              value={code}
            />
            {error ? (
              <Text className="mt-2 text-center text-xs text-red-600">{error}</Text>
            ) : null}
            <Text className="mb-8 mt-4 text-center text-xs text-slate-500">
              Didn’t get a code?{" "}
              <Text
                className="font-bold text-blue-700"
                onPress={() => {
                  setCode("");
                  setError("");
                  setNotice("A new demo code is ready. Tap the code boxes to enter it.");
                }}
              >
                Resend code
              </Text>
            </Text>
            {notice ? (
              <Text className="mb-4 text-center text-xs font-medium text-emerald-700">
                {notice}
              </Text>
            ) : null}
            <PrimaryButton label="Verify" onPress={verify} />
            <Text className="mt-4 text-center text-xs leading-5 text-slate-400">
              Prototype preview · Any 6 digits will continue. No real code is sent.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default function OnboardingScreen() {
  const [stage, setStage] = useState<
    "welcome" | "slides" | "account" | "forgot-password" | "otp"
  >(
    "welcome",
  );
  const [slide, setSlide] = useState(0);
  const [initialSignIn, setInitialSignIn] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  if (stage === "welcome") {
    return <Welcome onContinue={() => setStage("slides")} />;
  }

  if (stage === "account") {
    return (
      <AccountForm
        initialSignIn={initialSignIn}
        onBack={() => setStage("slides")}
        onForgotPassword={() => setStage("forgot-password")}
      />
    );
  }

  if (stage === "forgot-password") {
    return (
      <ForgotPassword
        onBack={() => setStage("account")}
        onSendCode={(email) => {
          setResetEmail(email);
          setStage("otp");
        }}
      />
    );
  }

  if (stage === "otp") {
    return (
      <OtpVerification
        email={resetEmail}
        onBack={() => setStage("forgot-password")}
        onVerify={() => router.replace("/(tabs)")}
      />
    );
  }

  return (
    <Onboarding
      slide={slide}
      onNext={() => {
        if (slide === slides.length - 1) {
          setStage("account");
        } else {
          setSlide((current) => current + 1);
        }
      }}
      onSkip={() => {
        setInitialSignIn(false);
        setStage("account");
      }}
      onSignIn={() => {
        setInitialSignIn(true);
        setStage("account");
      }}
    />
  );
}
