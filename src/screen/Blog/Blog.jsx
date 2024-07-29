import React from 'react';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';

export const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for a Better Shopping Experience",
      excerpt: "Discover essential tips to make your online shopping experience smoother and more enjoyable.",
      image: "https://en.blog.businessdecision.com/wp-content/uploads/2018/05/1-2.jpg",
      date: "7 June 2018 Updated , May 2023",
      author: "Kévin Vancappel",
      href: "https://en.blog.businessdecision.com/10-tips-to-improve-the-shopping-experience/"
    },
    {
      id: 2,
      title: "How to Choose the Perfect Product",
      excerpt: "Learn how to choose the right product for your needs with these helpful tips and guidelines.",
      image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*qGQCsrs3O4whFaqPPiyl2g.png",
      date: "Aug 9, 2021",
      author: "Selena Richard",
      href: "https://medium.com/the-research-nest/how-to-choose-the-right-products-for-your-online-store-287a14b1e0ff"
    },
    {
      id: 3,
      title: "The Benefits of Shopping Online",
      excerpt: "Explore the various advantages of online shopping and how it can benefit you.",
      image: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/09/pexels-cottonbro-5076514-1-scaled.jpg",
      date: "Jun 14, 2023",
      author: "Rashi Maheshwari",
      href: "https://www.forbes.com/advisor/in/credit-card/advantages-of-online-shopping/"
    },
    {
      id: 4,
      title: "7 BENEFITS OF ONLINE SHOPPING",
      excerpt: "Explore the various advantages of online shopping and how it can benefit you.",
      image: "https://pargo.co.za/wp-content/uploads/2018/03/online-shopping-ecommerce-ss-1920.png",
      date: "2024",
      href: "https://pargo.co.za/blog/7-benefits-of-online-shopping/",
      author: "Rashi Maheshwari"
    }
  ];

  return (
    <div className="mt-20 flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-500 to-gray-200 p-4">
      <div className="mt-16 w-full max-w-5xl bg-white shadow-xl rounded-3xl p-8 transform transition-transform duration-500 hover:scale-105">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">Our Blog</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <div key={post.id} className="bg-gray-300 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-500 hover:scale-105">
              <div className="relative group">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:opacity-70 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="bg-black bg-opacity-50 p-2 rounded-lg">
                    <h2 className="text-2xl font-bold text-white">{post.title}</h2>
                    <p className="text-white mb-2">{post.excerpt}</p>
                    <a href={post.href} className="text-indigo-400 font-semibold hover:underline">Read More</a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between text-gray-800 text-sm">
                  <span><FaCalendarAlt className="inline mr-1" />{post.date}</span>
                  <span>........................</span>
                  <span><FaUser className="inline mr-1" />by {post.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
