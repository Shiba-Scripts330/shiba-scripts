'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  content: string;
  code?: string;
}

export default function DocsPage() {
  const t = useTranslations('docs');
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections: Record<string, Section> = {
    'getting-started': {
      id: 'getting-started',
      title: t('gettingStarted'),
      content: `Welcome to Shiba Scripts documentation. This guide will help you get started with our premium FiveM scripts.

Our scripts are designed to be easy to install and configure. Each script comes with comprehensive documentation and support through our Discord community.

Whether you're new to FiveM scripting or an experienced developer, you'll find everything you need to get up and running.`,
      code: `-- Hello Shiba Scripts!
print("^2Shiba Scripts loaded successfully!^7")`,
    },
    'installation': {
      id: 'installation',
      title: t('installation'),
      content: `Follow these steps to install any Shiba Scripts script:

1. Download the script from your account page
2. Extract the ZIP file to your resources folder
3. Add the script to your server.cfg file
4. Restart your server
5. Configure the script (if needed)

Each script includes detailed configuration options in the config.lua file.`,
      code: `# Add this line to your server.cfg
ensure script_name

# Or use start command in console
start script_name`,
    },
    'licensing': {
      id: 'licensing',
      title: t('licensing'),
      content: `Each Shiba Scripts purchase includes a unique license key that protects your investment.

Your license key is essential for:
- Authenticating your script on your server
- Ensuring only authorized servers can run the script
- Receiving updates and support

To set up licensing:
1. Copy your license key from your account page
2. Add it to your script's config file
3. Restart your server

Each license is valid for one server. Contact support for multi-server licensing options.`,
      code: `-- License configuration example
Config = {
  LicenseKey = "YOUR-LICENSE-KEY-HERE",
  ServerName = "Your Server Name",
}`,
    },
    'api': {
      id: 'api',
      title: t('api'),
      content: `Shiba Scripts provides APIs for integrating with our platform.

Authentication:
- All API calls require your unique API key
- Include the key in the Authorization header
- Keys are available in your account settings

Available Endpoints:
- GET /api/licenses - Retrieve your licenses
- POST /api/support - Submit support tickets
- GET /api/scripts - Get script information
- POST /api/validate - Validate license keys

Rate Limiting:
- 100 requests per minute per API key
- Contact support for higher limits`,
      code: `-- Example API call
local function validateLicense(key)
  local response = PerformHttpRequest(
    "https://api.shibascripts.com/validate",
    function(status, response)
      print("Validation: " .. response)
    end,
    "POST",
    json.encode({license = key}),
    {["Content-Type"] = "application/json"}
  )
end`,
    },
    'troubleshooting': {
      id: 'troubleshooting',
      title: t('troubleshooting'),
      content: `Common Issues and Solutions:

1. Script not starting
   - Check server.cfg syntax
   - Verify dependencies are installed
   - Check server console for errors

2. License validation failed
   - Ensure license key is correct
   - Check internet connection
   - Verify script is in correct folder

3. Performance issues
   - Disable unused features in config
   - Check for resource conflicts
   - Monitor server performance with /perf command

4. Database errors
   - Verify MySQL connection
   - Check database user permissions
   - Ensure tables are created

Still having issues? Join our Discord for support!`,
      code: `-- Enable debug mode for troubleshooting
Config = {
  Debug = true,
  LogLevel = "INFO",
  -- Other config...
}

-- Check console for detailed logs`,
    },
  };

  const sidebarItems = [
    { id: 'getting-started', label: t('gettingStarted') },
    { id: 'installation', label: t('installation') },
    { id: 'licensing', label: t('licensing') },
    { id: 'api', label: t('api') },
    { id: 'troubleshooting', label: t('troubleshooting') },
  ];

  const activeContent = sections[activeSection];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-shiba-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-shiba-black dark:text-white mb-2">
            {t('title')}
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-shiba-main to-shiba-accent rounded-full"></div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1"
          >
            <nav className="sticky top-24 space-y-2 bg-gray-50 dark:bg-gray-900 rounded-lg p-4 md:p-0 md:bg-transparent md:dark:bg-transparent">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                    activeSection === item.id
                      ? 'bg-shiba-main text-white font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={itemVariants}
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-3 space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-shiba-black dark:text-white mb-4">
                {activeContent.title}
              </h2>
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {activeContent.content}
                </div>
              </div>
            </div>

            {/* Code Block */}
            {activeContent.code && (
              <div className="bg-gray-900 dark:bg-gray-950 rounded-lg overflow-hidden border border-gray-800">
                <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-4 text-xs text-gray-400 font-mono">code</span>
                </div>
                <pre className="p-4 overflow-x-auto">
                  <code className="text-gray-100 font-mono text-sm leading-relaxed">
                    {activeContent.code}
                  </code>
                </pre>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
              <div>
                {sidebarItems.findIndex((item) => item.id === activeSection) > 0 && (
                  <button
                    onClick={() => {
                      const currentIndex = sidebarItems.findIndex(
                        (item) => item.id === activeSection
                      );
                      setActiveSection(sidebarItems[currentIndex - 1].id);
                    }}
                    className="text-shiba-main dark:text-shiba-accent hover:text-shiba-accent dark:hover:text-shiba-main transition-colors font-semibold"
                  >
                    ← Previous
                  </button>
                )}
              </div>
              <div>
                {sidebarItems.findIndex((item) => item.id === activeSection) <
                  sidebarItems.length - 1 && (
                  <button
                    onClick={() => {
                      const currentIndex = sidebarItems.findIndex(
                        (item) => item.id === activeSection
                      );
                      setActiveSection(sidebarItems[currentIndex + 1].id);
                    }}
                    className="text-shiba-main dark:text-shiba-accent hover:text-shiba-accent dark:hover:text-shiba-main transition-colors font-semibold"
                  >
                    Next →
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
