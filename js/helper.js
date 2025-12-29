globalThis.safeBrowsingHelper = {
  getRequiredPermissions: function () {
    return {
      permissions: [
        // TODO: should be removed in Firefox case
        'alarms',
        'webRequest',
        'webNavigation',
        'scripting'
      ],
      origins: ['<all_urls>']
    }
  },
  requestPermissions: async function () {
    return await chrome.permissions.request(this.getRequiredPermissions())
  },
  hasEnoughPermissions: async function() {
    return await chrome.permissions.contains(this.getRequiredPermissions())
  }
}
