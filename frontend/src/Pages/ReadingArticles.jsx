import React from "react";
import Section from "../components/container/Section";
import BlogCard from "../components/BlogCard";
import { useReadingArticles } from "../hooks/useReadingArticles";
import Heading from "../components/common/Heading";

const Skeleton = ({ count = 3 }) => {
    return (
        <Section padding="none">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {Array.from({ length: count }).map((_, index) => (
                    <div key={index} className="p-1 border border-gray-300 animate-pulse">
                        <div className="h-20 bg-gray-200 mb-4"></div>
                        <div className="h-3 bg-gray-200 mb-2"></div>
                        <div className="h-1 bg-gray-200 mb-2"></div>
                        <div className="h-1 bg-gray-200"></div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

const BlogSection = ({ title, posts }) => {
    if (!posts?.length) return null;

    return (
        <Section padding="none">
            <Heading
                isItalic
                className="text-center text-brown mb-4 text-heading font-heading"
            >
                {title}
            </Heading>
       
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-8">
                {posts.map((post) => (
                    <BlogCard
                        key={post.id}
                        html={post.html}
                        title={post.title}
                        excerpt={post.excerpt}
                        reading_time={post.reading_time}
                        slug={post.slug}
                        tags={post.tags}
                        published_at={post.published_at}
                    />
                ))}
            </div>
        </Section>
    );
};

const ReadingArticlesComponent = () => {
    const { blogs, categories, isLoading, error } = useReadingArticles();

    if (isLoading) {
        return (
            <div className="space-y-8">
                <Skeleton />
                <Skeleton />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center py-4">{error}</div>;
    }

    const hasNoPosts = categories.length === 0;

    if (hasNoPosts) {
        return (
            <div className="text-center py-4 text-gray-600">
                No reading articles available at the moment.
            </div>
        );
    }

    return (
        <div className="mx-auto mt-8">
            {categories.map((category) => (
                <BlogSection
                    key={category.id}
                    title={category.title}
                    posts={blogs[category.id]}
                />
            ))}
        </div>
    );
};

export default ReadingArticlesComponent;
