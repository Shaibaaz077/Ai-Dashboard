"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Mail,
  FileText,
  Search,
  ChevronRight,
} from "lucide-react";

const faqs = [
  {
    q: "How do I generate content?",
    a: "Go to the Generate tab, type your prompt in the search bar, pick a content type chip or just describe what you want, then click Generate.",
  },
  {
    q: "Is AI really free?",
    a: "Yes! FalconAI is 100% free to use. You get 100 generations and up to 200K words per month on the free plan with no credit card required.",
  },
  {
    q: "How do I save my generated content?",
    a: "After generating, click the bookmark icon on any output to save it. You can find all saved items in the Saved tab on the sidebar.",
  },
  {
    q: "Can I change the tone of my output?",
    a: "Yes! Go to Settings and set your default tone to Professional, Casual, Creative or Persuasive. This will apply to all your generations.",
  },
  {
    q: "How do I view my generation history?",
    a: "Click History in the sidebar to see all your past generations. You can reuse any previous prompt directly from there.",
  },
  {
    q: "What content types can I generate?",
    a: "You can generate blog posts, emails, social media captions, code snippets, bios, and product descriptions — with more types coming soon.",
  },
];

const guides = [
  { title: "Getting started with FalconAI", tag: "Beginner" },
  { title: "How to write better prompts", tag: "Tips" },
  { title: "Using the Generate tab effectively", tag: "Guide" },
  { title: "Managing your saved content", tag: "Guide" },
  { title: "Customizing your settings", tag: "Settings" },
];

export default function page() {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = () => {
    if (!name || !email || !message) return;
    setSent(true);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-medium text-foreground">Help & Support</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Find answers or get in touch with us.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search for help..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
          <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
            <FileText className="w-6 h-6 text-blue-500" />
            <span className="text-sm font-medium">Docs</span>
            <span className="text-xs text-muted-foreground">
              Read the guides
            </span>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
          <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
            <MessageCircle className="w-6 h-6 text-green-500" />
            <span className="text-sm font-medium">Live chat</span>
            <span className="text-xs text-muted-foreground">Chat with us</span>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
          <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
            <Mail className="w-6 h-6 text-orange-500" />
            <span className="text-sm font-medium">Email us</span>
            <span className="text-xs text-muted-foreground">
              support@falconai.dev
            </span>
          </CardContent>
        </Card>
      </div>

      {/* FAQ */}
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Frequently asked questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredFaqs.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No results found for "{search}"
            </p>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-sm text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>

      {/* Guides */}
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Popular guides</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {guides.map((guide, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3 border-b last:border-0 hover:bg-muted/50 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{guide.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {guide.tag}
                </Badge>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Contact form */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Send us a message
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="text-center py-6">
              <p className="text-sm font-medium text-foreground mb-1">
                Message sent!
              </p>
              <p className="text-sm text-muted-foreground">
                We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Textarea
                placeholder="How can we help you?"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                onClick={handleSubmit}
                disabled={!name || !email || !message}
                className="w-full"
              >
                Send message
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
