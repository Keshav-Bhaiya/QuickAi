import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full mt-20 text-gray-500 dark:text-dark-text-secondary bg-white dark:bg-dark-bg">
    <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 dark:border-dark-border pb-6">
        <div className="md:max-w-96">
            <img className="h-9" src={assets.logo} alt="logo" />
            <p className="mt-6 text-sm" >
                Experience the power of AI with QuickAi. <br />
                Transform your content creation with our suite of premium AI tools. Write articles,
                generate images, and enhance your workflow.
            </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20">
            <div>
                <h2 className="font-semibold mb-5 text-gray-800 dark:text-dark-text">Company</h2>
                <ul className="text-sm space-y-2">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About us</a></li>
                    <li><a href="#">Contact us</a></li>
                    <li><a href="#">Privacy policy</a></li>
                </ul>
            </div>
            <div>
                <h2 className="font-semibold text-gray-800 dark:text-dark-text mb-5">Subscribe to our newsletter</h2>
                <div className="text-sm space-y-2">
                    <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
                    <div className="flex items-center gap-2 pt-4">
                        <input className="border border-gray-500/30 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-dark-text placeholder-gray-500 dark:placeholder-dark-text-muted focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 h-9 rounded px-2" type="email" placeholder="Enter your email" />
                        <button className="bg-primary hover:bg-primary/90 w-24 h-9 text-white rounded cursor-pointer transition-colors">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <p className="pt-4 text-center text-xs md:text-sm pb-5">
        Copyright 2025 © <a href="https://prebuiltui.com">AI-Power</a>. All Right Reserved.
    </p>
</footer>
    </div>
  )
}

export default Footer