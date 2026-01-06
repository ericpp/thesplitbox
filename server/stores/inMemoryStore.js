const inMemoryMetaStore = [];
const inMemoryUserStore = [];

const storeMetadata = {
  add: (metadata) => {
    inMemoryMetaStore.push(metadata);
  },
  getAll: async () => {
    return inMemoryMetaStore;
  },
  getById: async (id) => {
    return inMemoryMetaStore.find((item) => item.id === id);
  },
  getByInvoice: async (invoice) => {
    return inMemoryMetaStore.find((item) => item.invoice === invoice);
  },
  updateById: async (id, updatedData) => {
    const index = inMemoryMetaStore.findIndex((item) => item.id === id);
    if (index === -1) return null;
    inMemoryMetaStore[index] = { ...inMemoryMetaStore[index], ...updatedData };
    return inMemoryMetaStore[index];
  },
  updateByInvoice: async (invoice, updatedData) => {
    const index = inMemoryMetaStore.findIndex(
      (item) => item.invoice === invoice
    );
    if (index === -1) return null;
    inMemoryMetaStore[index] = { ...inMemoryMetaStore[index], ...updatedData };
    return inMemoryMetaStore[index];
  },
  deleteById: async (id) => {
    const index = inMemoryMetaStore.findIndex((item) => item.id === id);
    if (index === -1) return false;
    inMemoryMetaStore.splice(index, 1);
    return true;
  },
  saveSettings: async (address, settings) => {
    let user = inMemoryUserStore.find((v) => v.address === address);

    if (!user) {
      // If the user doesn't exist, add a new user with address and destructured settings
      inMemoryUserStore.push({ address, ...settings });
    } else {
      // If the user exists, update the existing user's properties by destructuring settings
      Object.assign(user, { address, ...settings });
    }

    return true;
  },
  fetchSettings: async (address) => {
    const user = inMemoryUserStore.find((v) => v.address === address);
    if (user) {
      // Return settings in the expected format
      return {
        albyAccessToken: user.albyAccessToken ? true : false,
        approvedGuids: user.approvedGuids?.length > 0 ? user.approvedGuids : [],
      };
    }
    // Return default settings if user is not found
    return {
      albyAccessToken: false,
      approvedGuids: [],
    };
  },
};

export default storeMetadata;
