"use client"

import { useState, useEffect, useRef } from "react"
import { ChatMessage } from "@/components/chat-message"
import { ChatInput } from "@/components/chat-input"
import { QuickActions } from "@/components/quick-actions"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Sparkles, AlertTriangle, Bell, BellOff, Vibrate } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: string
  isCritical?: boolean
  isNew?: boolean
  hasChart?: boolean
  suggestions?: string[]
  alertTriggered?: boolean
  vibrationTriggered?: boolean
}

const criticalKeywords = [
  "failure",
  "critical",
  "emergency",
  "urgent",
  "breakdown",
  "malfunction",
  "overheating",
  "vibration",
  "bearing",
  "leak",
  "pressure",
  "temperature",
  "shutdown",
  "stop",
  "danger",
  "risk",
  "damage",
  "repair",
  "maintenance",
]

const warningKeywords = [
  "high",
  "low",
  "unusual",
  "abnormal",
  "increase",
  "decrease",
  "concern",
  "check",
  "monitor",
  "watch",
  "attention",
  "issue",
  "problem",
]

const initialMessages: Message[] = [
  {
    id: "1",
    content:
      "🤖 **Hello! I'm Cortexa AI** - your intelligent assistant for predictive maintenance and energy optimization.\n\n**Enhanced Features:**\n• 🚨 **Smart Alert Detection** - I analyze every message for critical issues\n• 📳 **Vibration Alerts** - Physical feedback for urgent situations\n• 🔔 **Real-time Notifications** - Instant alerts for critical conditions\n• 🎯 **Contextual Responses** - Tailored advice based on your specific situation\n\nHow can I assist you today?",
    sender: "ai",
    timestamp: "Just now",
    suggestions: [
      "Show critical alerts",
      "Check machine health",
      "Analyze energy patterns",
      "Predict maintenance needs",
    ],
  },
]

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isTyping, setIsTyping] = useState(false)
  const [aiMood, setAiMood] = useState<"normal" | "alert" | "excited">("normal")
  const [alertsEnabled, setAlertsEnabled] = useState(true)
  const [vibrationEnabled, setVibrationEnabled] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const triggerVibration = (pattern: "critical" | "warning" | "info" = "critical") => {
    if (!vibrationEnabled || !navigator.vibrate) return

    const patterns = {
      critical: [200, 100, 200, 100, 200, 100, 400], // Urgent pattern
      warning: [100, 50, 100, 50, 200], // Moderate pattern
      info: [50, 25, 50], // Gentle pattern
    }

    navigator.vibrate(patterns[pattern])
  }

  const analyzeMessageForAlerts = (
    message: string,
  ): {
    isCritical: boolean
    severity: "critical" | "warning" | "info"
    alertTriggered: boolean
    vibrationTriggered: boolean
  } => {
    const lowerMessage = message.toLowerCase()

    // Check for critical keywords
    const hasCriticalKeywords = criticalKeywords.some((keyword) => lowerMessage.includes(keyword))

    // Check for warning keywords
    const hasWarningKeywords = warningKeywords.some((keyword) => lowerMessage.includes(keyword))

    // Determine severity
    let severity: "critical" | "warning" | "info" = "info"
    let isCritical = false
    let alertTriggered = false
    let vibrationTriggered = false

    if (hasCriticalKeywords) {
      severity = "critical"
      isCritical = true
      alertTriggered = true
      vibrationTriggered = true
      triggerVibration("critical")
    } else if (hasWarningKeywords) {
      severity = "warning"
      alertTriggered = true
      vibrationTriggered = true
      triggerVibration("warning")
    }

    return { isCritical, severity, alertTriggered, vibrationTriggered }
  }

  const generateResponse = async (userMessage: string) => {
    const message = userMessage.toLowerCase()
    const analysis = analyzeMessageForAlerts(userMessage)

    const response = {
      content: "",
      isCritical: analysis.isCritical,
      hasChart: false,
      suggestions: [] as string[],
    }

    // Generate contextual responses based on message analysis
    if (analysis.isCritical) {
      setAiMood("alert")
      response.content = `🚨 **CRITICAL ALERT DETECTED**\n\nI've analyzed your message and detected potential critical issues. Here's my immediate assessment:\n\n**Detected Keywords:** ${criticalKeywords.filter((k) => message.includes(k)).join(", ")}\n\n**Immediate Actions:**\n• 🔴 Alert triggered and logged\n• 📳 Vibration notification sent\n• 🚨 Maintenance team notified\n• 📊 Initiating detailed analysis\n\n**Recommended Response:**\n1. **Immediate inspection** of affected equipment\n2. **Safety protocols** should be activated\n3. **Maintenance team** dispatch recommended\n4. **Production halt** may be necessary\n\n*This is an AI-generated alert. Please verify conditions manually.*`

      response.suggestions = [
        "Contact maintenance team",
        "View machine diagnostics",
        "Check safety protocols",
        "Generate incident report",
      ]
    } else if (analysis.severity === "warning") {
      setAiMood("alert")
      response.content = `⚠️ **WARNING CONDITION DETECTED**\n\nI've identified potential warning indicators in your message:\n\n**Analysis Results:**\n• Warning-level keywords detected\n• Monitoring systems activated\n• Preventive measures recommended\n\n**Suggested Actions:**\n1. **Monitor** the situation closely\n2. **Schedule** preventive maintenance\n3. **Document** current conditions\n4. **Prepare** for potential escalation\n\n*Continue monitoring and keep me updated on any changes.*`

      response.suggestions = ["Schedule maintenance", "Set up monitoring", "View trends", "Get recommendations"]
    } else {
      // Standard responses for non-critical messages
      if (message.includes("energy") || message.includes("consumption") || message.includes("power")) {
        setAiMood("normal")
        response.content =
          "📊 **Current Energy Analysis:**\n\n• Total consumption: 24.7 MW (3% below yesterday)\n• Peak usage: 28.2 MW at 2:30 PM\n• Cutting Machine #3: ⚠️ 15% above normal\n• Efficiency score: 94.2%\n\n**Recommendation:** Check Cutting Machine #3 bearing condition immediately."
        response.hasChart = true
        response.suggestions = ["View detailed energy chart", "Schedule maintenance", "Set energy alerts"]
      } else if (message.includes("predict") || message.includes("forecast") || message.includes("failure")) {
        setAiMood("normal")
        response.content =
          "🔮 **AI Predictions Dashboard:**\n\n**High Priority:**\n• Cutting Machine #3: Bearing failure in 7 days (87% confidence)\n\n**Medium Priority:**\n• Lathe Machine #5: Maintenance window this weekend (99% confidence)\n\n**Low Priority:**\n• Press Machine #1: Optimal performance continuing (94% confidence)\n\n**Predictive accuracy this month: 96.3%**"
        response.suggestions = ["View prediction details", "Set up alerts", "Export report"]
      } else {
        setAiMood("normal")
        response.content = `I understand you're asking about our industrial operations. I can help with:\n\n🔧 **Machine Health Monitoring**\n⚡ **Energy Analysis**\n🔮 **Predictive Maintenance**\n📈 **Optimization Recommendations**\n🚨 **Smart Alert Detection**\n📳 **Vibration Notifications**\n\n⚠️ **Demo Mode** - Database not connected\n\nCould you be more specific about what you'd like to know?`
        response.suggestions = [
          "Show system overview",
          "Check machine status",
          "View energy trends",
          "Get recommendations",
        ]
      }
    }

    return response
  }

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Analyze message for alerts before generating response
    const analysis = analyzeMessageForAlerts(content)

    // Variable response delay based on criticality
    const responseDelay = analysis.isCritical ? 500 : 1200

    setTimeout(async () => {
      const response = await generateResponse(content)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isCritical: response.isCritical,
        hasChart: response.hasChart,
        suggestions: response.suggestions,
        isNew: true,
        alertTriggered: analysis.alertTriggered,
        vibrationTriggered: analysis.vibrationTriggered,
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)

      // Enhanced notification system
      if (response.isCritical && alertsEnabled && "Notification" in window) {
        if (Notification.permission === "granted") {
          new Notification("🚨 Critical Alert from Cortexa AI", {
            body: "Critical condition detected in your message. Immediate attention required.",
            icon: "/favicon.ico",
            tag: "critical-alert",
            requireInteraction: true,
          })
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              new Notification("🚨 Critical Alert from Cortexa AI", {
                body: "Critical condition detected in your message. Immediate attention required.",
                icon: "/favicon.ico",
                tag: "critical-alert",
                requireInteraction: true,
              })
            }
          })
        }
      }

      // Reset mood after 8 seconds for critical, 5 seconds for others
      setTimeout(() => setAiMood("normal"), response.isCritical ? 8000 : 5000)
    }, responseDelay)
  }

  const handleQuickAction = (query: string) => {
    handleSendMessage(query)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const getMoodIcon = () => {
    switch (aiMood) {
      case "alert":
        return <AlertTriangle className="h-6 w-6 text-destructive animate-pulse" />
      case "excited":
        return <Sparkles className="h-6 w-6 text-accent animate-bounce" />
      default:
        return <Bot className="h-6 w-6 text-primary" />
    }
  }

  const getMoodColor = () => {
    switch (aiMood) {
      case "alert":
        return "bg-destructive/10 border-destructive/20"
      case "excited":
        return "bg-accent/10 border-accent/20"
      default:
        return "bg-primary/10 border-primary/20"
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Enhanced Header with AI mood and controls */}
      <div className="p-6 border-b border-border">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className={`p-2 rounded-full transition-all duration-300 ${getMoodColor()}`}>{getMoodIcon()}</div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Cortexa AI
            </h1>
          </div>
          <p className="text-muted-foreground">Your intelligent partner with smart alert detection</p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <span className="text-xs text-muted-foreground">Demo Mode</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAlertsEnabled(!alertsEnabled)}
                className={`h-8 px-2 ${alertsEnabled ? "text-green-500" : "text-muted-foreground"}`}
              >
                {alertsEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setVibrationEnabled(!vibrationEnabled)}
                className={`h-8 px-2 ${vibrationEnabled ? "text-blue-500" : "text-muted-foreground"}`}
              >
                <Vibrate className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <QuickActions onQuickAction={handleSendMessage} />

      {/* Messages with enhanced styling */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <Card className="p-4 bg-yellow-50 border-yellow-200 mb-4">
          <div className="flex items-center gap-2 text-yellow-800">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">
              <strong>Demo Mode:</strong> Database not connected. All AI features work with simulated data.
            </span>
          </div>
        </Card>

        {messages.map((message) => (
          <div key={message.id}>
            <ChatMessage {...message} />
            {message.sender === "ai" && message.suggestions && (
              <div className="flex flex-wrap gap-2 mt-2 ml-11">
                {message.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(suggestion)}
                    className="px-3 py-1 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors duration-200 border border-primary/20"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            {message.alertTriggered && (
              <div className="flex items-center gap-2 mt-2 ml-11 text-xs text-muted-foreground">
                <AlertTriangle className="h-3 w-3 text-orange-500" />
                <span>Alert triggered</span>
                {message.vibrationTriggered && (
                  <>
                    <Vibrate className="h-3 w-3 text-blue-500" />
                    <span>Vibration sent</span>
                  </>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Enhanced Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="flex items-start gap-3 max-w-[80%]">
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${getMoodColor()}`}
              >
                {getMoodIcon()}
              </div>
              <Card className="p-3 bg-card">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">
                    {aiMood === "alert" ? "Analyzing critical situation..." : "Cortexa is thinking..."}
                  </span>
                </div>
              </Card>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  )
}
