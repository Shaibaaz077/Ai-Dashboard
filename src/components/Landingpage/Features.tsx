import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { LayoutList, Mail, Image, Code2, User, Star } from "lucide-react";

function Features() {
  return (
    <section className="h-full flex items-start justify-center">
      <div className="flex items-center justify-center flex-col gap-2 mt-8 sm:mb-8 p-6">
        <h2 className="text-xl sm:text-3xl font-semibold text-primary">
          What you can generate
        </h2>
        <p className="text-chart-2 text-center text-xs sm:text-sm">
          One tool for all your AI content needs completely free.
        </p>
        <div className="text-primary w-full h-full  grid grid-cols-1 gap-4 mt-6 ml-16 sm:grid-cols-3 sm:gap-6 sm:mt-10 ">
          <Card className="h-full w-72 shadow-sm hover:shadow-lg transition cursor-pointer p-4">
            <CardHeader>
              <div className="h-10 w-10 bg-blue-200 flex justify-center items-center mt-2 mb-4 rounded-md">
                <LayoutList className="text-blue-600" />
              </div>
              <CardTitle>
                <span className="sm:text-lg pb-2">Blog posts</span>
              </CardTitle>
              <CardDescription>
                <p className="py-2">
                  Generate full articles and blog posts from a simple topic or
                  title.
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="h-full w-72 shadow-sm hover:shadow-lg transition cursor-pointer p-4">
            <CardHeader>
              <div className="h-10 w-10 bg-green-200 flex justify-center items-center mt-2 mb-4 rounded-md">
                <Mail className="text-green-600" />
              </div>
              <CardTitle>
                <span className="sm:text-lg pb-2">Emails</span>
              </CardTitle>
              <CardDescription>
                <p className="py-2">
                  Write professional emails, cold outreach, or newsletters in
                  seconds.
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="h-full w-72 shadow-sm hover:shadow-lg transition cursor-pointer p-4">
            <CardHeader>
              <div className="h-10 w-10 bg-pink-200 flex justify-center items-center mt-2 mb-4 rounded-md">
                <Image className="text-pink-600" aria-label="image icon" />
              </div>
              <CardTitle>
                <span className="sm:text-lg pb-2">Social captions</span>
              </CardTitle>
              <CardDescription>
                <p className="py-2">
                  Create catchy Instagram, Twitter and LinkedIn captions
                  instantly.
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="h-full w-72 shadow-sm hover:shadow-lg transition cursor-pointer p-4">
            <CardHeader>
              <div className="h-10 w-10 bg-blue-200 flex justify-center items-center mt-2 mb-4 rounded-md">
                <Code2 className="text-blue-600" />
              </div>
              <CardTitle>
                <span className="sm:text-lg pb-2">Code snippets</span>
              </CardTitle>
              <CardDescription>
                <p className="py-2">
                  Generate clean, working code in any language from a
                  description.
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="h-full w-72 shadow-sm hover:shadow-lg transition cursor-pointer p-4">
            <CardHeader>
              <div className="h-10 w-10 bg-green-200 flex justify-center items-center mt-2 mb-4 rounded-md">
                <User className="text-green-600" />
              </div>
              <CardTitle>
                <span className="sm:text-lg pb-2">Bio & about me</span>
              </CardTitle>
              <CardDescription>
                <p className="py-2">
                  Write a professional bio for your website, LinkedIn or
                  portfolio.
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="h-full w-72 shadow-sm hover:shadow-lg transition cursor-pointer p-4">
            <CardHeader>
              <div className="h-10 w-10 bg-pink-200 flex justify-center items-center mt-2 mb-4 rounded-md">
                <Star className="text-pink-600" />
              </div>
              <CardTitle>
                <span className="sm:text-lg pb-2">Product descriptions</span>
              </CardTitle>
              <CardDescription>
                <p className="py-2">
                  Create sales-driven product descriptions for e-commerce
                  stores.
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Features;
