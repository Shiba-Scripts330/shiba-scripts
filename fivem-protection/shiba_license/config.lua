Config = {}

-- Shiba Scripts API endpoint
Config.ApiUrl = "https://your-domain.com/api/validate-license"

-- Your license keys (add one per script)
Config.Licenses = {
    ["shiba_garage"]   = "SHIBA-XXXX-XXXX-XXXX-XXXX",
    ["shiba_banking"]  = "SHIBA-XXXX-XXXX-XXXX-XXXX",
    -- Add more scripts here:
    -- ["resource_name"] = "LICENSE_KEY",
}

-- If true, stop the resource when license is invalid
Config.StopOnInvalid = true

-- Retry settings
Config.RetryAttempts = 3
Config.RetryDelay = 5000 -- ms
