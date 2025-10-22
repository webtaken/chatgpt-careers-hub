"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import Link from "next/link";
import { apiNewsletterPostsList, type Post } from "@/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { setBasePathToAPIClient } from "@/lib/utils";

interface PromotionData {
  id: number;
  title: string;
  description: string;
  discount: string;
  duration: string;
  level: string;
  students: string;
  rating: string;
  link: string;
  image: string;
  gradient: string;
  features: string[];
}

// Skeleton component for loading state
function PromotionCarouselSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden mb-2 sm:mb-4 shadow-sm">
      <div className="relative h-28 sm:h-36 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse">
        {/* Content Skeleton */}
        <div className="relative flex items-center h-full px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex-1">
            {/* Header skeleton */}
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-gray-300 h-5 w-16 rounded-full"></div>
              <div className="bg-gray-300 h-4 w-32 rounded"></div>
            </div>

            {/* Subtitle skeleton */}
            <div className="bg-gray-300 h-3 w-48 rounded mb-2"></div>

            {/* Course details skeleton */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
              <div className="flex items-center gap-1">
                <div className="bg-gray-300 h-3 w-3 rounded"></div>
                <div className="bg-gray-300 h-3 w-6 rounded"></div>
              </div>
              <div className="flex items-center gap-1">
                <div className="bg-gray-300 h-3 w-3 rounded"></div>
                <div className="bg-gray-300 h-3 w-12 rounded"></div>
              </div>
              <div className="flex items-center gap-1">
                <div className="bg-gray-300 h-3 w-3 rounded"></div>
                <div className="bg-gray-300 h-3 w-8 rounded"></div>
              </div>
              <div className="flex items-center gap-1">
                <div className="bg-gray-300 h-3 w-3 rounded"></div>
                <div className="bg-gray-300 h-3 w-10 rounded"></div>
              </div>
            </div>

            {/* Features skeleton */}
            <div className="flex flex-wrap gap-1 mb-2">
              <div className="bg-gray-300 h-5 w-20 rounded-full"></div>
              <div className="bg-gray-300 h-5 w-24 rounded-full"></div>
              <div className="bg-gray-300 h-5 w-16 rounded-full"></div>
            </div>

            {/* CTA Button skeleton */}
            <div className="bg-gray-300 h-6 sm:h-7 w-20 sm:w-24 rounded"></div>
          </div>
        </div>

        {/* Dots skeleton */}
        <div className="absolute bottom-1 sm:bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}

export function PromotionCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [promotions, setPromotions] = useState<PromotionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  // Transform API post to promotion data
  const transformPostToPromotion = (
    post: Post,
    index: number
  ): PromotionData => {
    const gradients = [
      "from-purple-600 to-pink-600",
      "from-blue-600 to-cyan-600",
      "from-green-600 to-teal-600",
      "from-orange-600 to-red-600",
      "from-indigo-600 to-purple-600",
    ];

    // Parse metadata for additional fields
    const metadata = (post.metadata as Record<string, any>) || {};

    return {
      id: post.id,
      title: post.title,
      description: post.body_md || post.body || "Special promotion available",
      discount: metadata.discount || "Limited Time",
      duration: metadata.duration || "Lifetime Access",
      level: metadata.level || "All Levels",
      students: metadata.students || "500+ users",
      rating: metadata.rating || "4.8",
      link: post.external_url || "#",
      image:
        post.image_url ||
        "https://images.unsplash.com/photo-1685159375835-e987def57d25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMGNvdXJzZSUyMHByb21vdGlvbiUyMGJhbm5lcnxlbnwxfHx8fDE3NTk4NTY4ODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      gradient: gradients[index % gradients.length],
      features: metadata.features || [
        "Special Offer",
        "Limited Time",
        "Exclusive Access",
      ],
    };
  };

  // Fetch promotions from API
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setBasePathToAPIClient();
        const response = await apiNewsletterPostsList({
          type: "promo",
          pinned: true,
          isPublished: true,
          pageSize: 10,
        });

        if (response.results && response.results.length > 0) {
          const transformedPromotions = response.results.map(
            transformPostToPromotion
          );
          setPromotions(transformedPromotions);
        } else {
          // Use fallback data if no API data
          setPromotions([]);
        }
      } catch (err) {
        console.error("Error fetching promotions:", err);
        setError("Failed to load promotions");
        // Use fallback data on error
        setPromotions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  useEffect(() => {
    if (promotions.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [promotions.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promotions.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + promotions.length) % promotions.length
    );
  };

  const openImageDialog = () => {
    setIsImageDialogOpen(true);
  };

  const closeImageDialog = () => {
    setIsImageDialogOpen(false);
  };

  // Show loading skeleton
  if (isLoading) {
    return <PromotionCarouselSkeleton />;
  }

  // Show error state or empty state
  if (error || promotions.length === 0) {
    return null; // Don't show anything if there's an error or no promotions
  }

  const currentPromo = promotions[currentSlide];

  if (isLoading || error || promotions.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden mb-2 sm:mb-4 shadow-sm">
      <div className="relative h-28 sm:h-36 bg-gradient-to-r from-gray-50 to-gray-100">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${currentPromo.gradient} opacity-90`}
        />

        {/* Background Image */}
        <ImageWithFallback
          src={currentPromo.image}
          alt={currentPromo.title}
          className="absolute inset-0 w-full h-full object-cover opacity-15 z-0"
        />

        {/* Content */}
        <div className="relative flex items-center h-full px-3 sm:px-6 z-10">
          <div className="flex-1">
            {/* Header with discount badge and title */}
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white text-purple-700 text-xs font-bold px-2 sm:px-3 py-1 rounded-full shadow-sm">
                {currentPromo.discount}
              </span>
              <h3 className="text-white text-sm sm:text-base font-semibold line-clamp-1">
                {currentPromo.title}
              </h3>
            </div>

            {/* Subtitle */}
            <p className="text-white/90 text-xs sm:text-sm mb-2 line-clamp-1">
              {currentPromo.description}
            </p>

            {/* Course details */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
              <div className="flex items-center gap-1">
                <span className="text-white/80 text-xs">⭐</span>
                <span className="text-white text-xs font-medium">
                  {currentPromo.rating}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-white/80 text-xs">👥</span>
                <span className="text-white text-xs">
                  {currentPromo.students}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-white/80 text-xs">⏱️</span>
                <span className="text-white text-xs">
                  {currentPromo.duration}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-white/80 text-xs">📚</span>
                <span className="text-white text-xs">{currentPromo.level}</span>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-1 mb-2">
              {currentPromo.features.map((feature, index) => (
                <span
                  key={index}
                  className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-2">
              <Link href={currentPromo.link} target="_blank">
                <Button
                  size="sm"
                  className="bg-white text-gray-900 hover:bg-gray-100 h-6 sm:h-7 px-3 sm:px-4 text-xs font-medium shadow-sm"
                >
                  <span className="hidden sm:inline">Get Discount</span>
                  <span className="sm:hidden">Get Discount</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </Link>

              <Button
                size="sm"
                variant="outline"
                onClick={openImageDialog}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 h-6 sm:h-7 px-2 sm:px-3 text-xs font-medium shadow-sm"
                aria-label="Preview image"
              >
                <Eye className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation - Hidden on mobile */}
        <button
          onClick={prevSlide}
          className="hidden sm:block absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-1 transition-colors"
        >
          <ChevronLeft className="w-3 h-3" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden sm:block absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-1 transition-colors"
        >
          <ChevronRight className="w-3 h-3" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-1 sm:bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
          {promotions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Mobile touch indicators */}
        <div className="sm:hidden absolute inset-x-0 top-0 bottom-0 flex">
          <button
            onClick={prevSlide}
            className="flex-1 opacity-0"
            aria-label="Previous"
          />
          <button
            onClick={nextSlide}
            className="flex-1 opacity-0"
            aria-label="Next"
          />
        </div>
      </div>

      {/* Image Preview Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={closeImageDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle className="text-lg font-semibold text-gray-900 truncate pr-4">
              {currentPromo.title}
            </DialogTitle>
          </DialogHeader>

          {/* Image */}
          <div className="relative mb-4">
            <Link
              href={currentPromo.link}
              target="_blank"
              className="hover:cursor-pointer"
            >
              <ImageWithFallback
                src={currentPromo.image}
                alt={currentPromo.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
