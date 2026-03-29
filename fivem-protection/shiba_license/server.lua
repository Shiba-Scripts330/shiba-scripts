--[[
  Shiba Scripts - Server-side License Validation
  This script validates license keys on server start.
  If a license is invalid, the associated resource will be stopped.
]]

local validated = {}
local TAG = "^3[Shiba Scripts]^0"

-- Validate a single license
local function ValidateLicense(resourceName, licenseKey, attempt)
    attempt = attempt or 1

    PerformHttpRequest(Config.ApiUrl, function(statusCode, responseText, headers)
        if statusCode == 200 then
            local response = json.decode(responseText)

            if response and response.valid then
                validated[resourceName] = true
                print(TAG .. " ^2✓ License valid for: " .. resourceName .. "^0")
            else
                local msg = response and response.message or "Unknown error"
                print(TAG .. " ^1✗ License INVALID for: " .. resourceName .. " - " .. msg .. "^0")

                if Config.StopOnInvalid then
                    print(TAG .. " ^1Stopping resource: " .. resourceName .. "^0")
                    StopResource(resourceName)
                end
            end
        else
            if attempt < Config.RetryAttempts then
                print(TAG .. " ^3⚠ Validation failed for: " .. resourceName ..
                    " (attempt " .. attempt .. "/" .. Config.RetryAttempts .. ") - retrying...^0")

                SetTimeout(Config.RetryDelay, function()
                    ValidateLicense(resourceName, licenseKey, attempt + 1)
                end)
            else
                print(TAG .. " ^1✗ Could not validate: " .. resourceName ..
                    " after " .. Config.RetryAttempts .. " attempts^0")

                if Config.StopOnInvalid then
                    print(TAG .. " ^1Stopping resource: " .. resourceName .. "^0")
                    StopResource(resourceName)
                end
            end
        end
    end, "POST", json.encode({
        license_key = licenseKey,
    }), {
        ["Content-Type"] = "application/json"
    })
end

-- Run validation on resource start
AddEventHandler("onResourceStart", function(resourceName)
    if resourceName == GetCurrentResourceName() then
        -- Validate all configured licenses on our own start
        print(TAG .. " ^3Initializing license validation system...^0")
        print(TAG .. " ^3Found " .. CountTable(Config.Licenses) .. " license(s) to validate^0")

        for resName, key in pairs(Config.Licenses) do
            if key ~= "SHIBA-XXXX-XXXX-XXXX-XXXX" then
                ValidateLicense(resName, key)
            else
                print(TAG .. " ^3⚠ Skipping " .. resName .. " - placeholder license key^0")
            end
        end
    else
        -- Check if a starting resource needs validation
        local key = Config.Licenses[resourceName]
        if key and key ~= "SHIBA-XXXX-XXXX-XXXX-XXXX" then
            if not validated[resourceName] then
                ValidateLicense(resourceName, key)
            end
        end
    end
end)

-- Helper to count table entries
function CountTable(t)
    local count = 0
    for _ in pairs(t) do count = count + 1 end
    return count
end

-- Export for other resources to check
exports("IsLicenseValid", function(resourceName)
    return validated[resourceName] == true
end)

-- Command to re-validate (admin only)
RegisterCommand("shiba_revalidate", function(source, args, rawCommand)
    if source ~= 0 then
        print(TAG .. " ^1This command can only be used from the server console^0")
        return
    end

    print(TAG .. " ^3Re-validating all licenses...^0")
    validated = {}

    for resName, key in pairs(Config.Licenses) do
        if key ~= "SHIBA-XXXX-XXXX-XXXX-XXXX" then
            ValidateLicense(resName, key)
        end
    end
end, true)

print(TAG .. " ^2License protection system loaded^0")
