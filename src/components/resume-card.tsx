"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React, { use, useEffect } from "react";
import Markdown from "react-markdown";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
  location?:string;
  lab?:string;
  type?:string
}
export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
  location,
  lab,
  type,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (type!='blog'&& description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <Link
      href={href || "#"}
      className="block cursor-pointer"
      onClick={handleClick}
    >
      <Card className="flex">
        {logoUrl!="" && <div className="flex-none print:hidden">
          <Avatar className="border size-12 m-auto bg-muted-background dark:bg-foreground">
            <AvatarImage
              src={logoUrl}
              alt={altText}
              className="object-contain"
            />
            <AvatarFallback>{altText[0]}</AvatarFallback>
          </Avatar>
        </div>}
        <div className={cn("flex-grow items-center flex-col group", logoUrl==""?'mx-0':'ml-4')}>
          <CardHeader>
            <div className="flex items-center justify-between gap-x-2 text-base">
              <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
                {title}
                {badges && (
                  <span className="inline-flex gap-x-1 px-1">
                    {badges.map((badge, index) => (
                      <Badge
                        variant="outline"
                        className="align-middle text-xs py-0 print:border-none"
                        key={index}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </span>
                )}
                <ChevronRightIcon
                  className={cn(
                    "size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100 print:hidden",
                    isExpanded ? "rotate-90" : "rotate-0"
                  )}
                />
              </h3>
              <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                {period}
              </div>
            </div>
            {
              lab &&
              <div className="flex items-center justify-between gap-x-2 text-base">
                <div className="font-sans text-xs">{lab}</div>
                <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                {location && <div className="font-sans text-xs">{location}</div>}
              </div>
            </div>
            }
            <div className="flex items-center justify-between gap-x-2 text-base">
              <div>
                {subtitle && <div className="font-sans text-xs">{subtitle}</div>}
              </div>
              <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                {location && (lab==="" || lab===undefined) &&<div className="font-sans text-xs">{location}</div>}
              </div>
            </div>
            
          </CardHeader>
          {description && (
            <>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isExpanded ? 1 : 0,

                height: isExpanded ? "auto" : 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-2 text-xs print:hidden"
            >
              <Markdown className="text-xs ">
              {description}
              </Markdown>
            </motion.div>
            <Markdown className="text-xs print:px-2 mt-1 hidden print:block">
              {description}
            </Markdown>
            </>
          )}
        </div>
      </Card>
    </Link>
  );
};
