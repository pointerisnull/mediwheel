import { Account, Client, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';

const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.phg.medwheel",
    projectID: "67267d49002c4055bd74",
    databaseID: "67267e0900138d1e961c",
    userCollectionID: "67267e130026a4b10770",
    medCollectionID: "67268af50016e7eec1bc"
}

const {
    endpoint,
    platform,
    projectID,
    databaseID,
    userCollectionID,
    medCollectionID
} = config

const client = new Client();

client
    .setEndpoint(endpoint)
    .setProject(projectID)
    .setPlatform(platform)

const demoaccount_email = "demoaccount@demoaccount.com";
const demoaccount_password = "demoaccount";
const demoaccount_username = "DemoUser"

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const signIn = async (email, password) => {
    try{
        const session = await account.createEmailPasswordSession(
            email,
            password
        );
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try { 
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            databaseID,
            userCollectionID,
            [Query.equal('accountID', currentAccount.$id)]
        );

        if (!currentUser) throw Error;

        console.log("user found!");

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
};

// Function to check if there is an active session

export const checkActiveSession = async () => {
    try {
      const session = await account.getSession('current'); // Get the current session
      return session !== null; // Return true if there is an active session
    } catch (error) {
      // If there's an error (e.g., no active session), handle it appropriately
      if (error.code === 401) {
        return false; // No active session
      }
      throw error; // Re-throw other unexpected errors
    }
};

  
// Function to delete all sessions for the current user

export const deleteSessions = async () => {
  try {
    // Get the list of all sessions
    const sessions = await account.listSessions();

    // Delete each session
    await Promise.all(
      sessions.sessions.map(async (session) => {
        await account.deleteSession(session.$id);
      })
    );

    console.log('All sessions deleted successfully');
  } catch (error) {
    console.error('Error deleting sessions:', error.message);
    //throw error; // Re-throw the error for further handling
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    throw new Error(error)
  }
}

export const getMedication = async (medID) => {
  try {
    // console.log("artist requested: ", artistID);
    const posts = await databases.listDocuments(
      databaseID,
      medCollectionID,
      [Query.equal('$id', medID)]
    )

    return posts.documents[0]
  } catch (error) {
    throw new Error(error);
  }
}

export const updatePrescs = async (userId, newPrescriptions) => {
  try {
      await databases.updateDocument(
          databaseID,
          userCollectionID,
          userId,
          { prescriptions: newPrescriptions }
      );
  } catch (error) {
      throw new Error(error);
  }
};

export const updatePrescsTimes = async (userId, newPrescriptionTimes) => {
  try {
      await databases.updateDocument(
          databaseID,
          userCollectionID,
          userId,
          { prescriptions_times: newPrescriptionTimes }
      );
  } catch (error) {
      throw new Error(error);
  }
};

export const updatePrescsDoses = async (userId, newPrescriptionDosages) => {
  try {
      await databases.updateDocument(
          databaseID,
          userCollectionID,
          userId,
          { prescriptions_dosages_mg: newPrescriptionDosages }
      );
  } catch (error) {
      throw new Error(error);
  }
};

export const updateUserPrescriptions = async (userId, newPrescriptions, newPrescriptionTimes, newPrescriptionDosages) => {
  try {
      await databases.updateDocument(
          databaseID,
          userCollectionID,
          userId,
          {
              prescriptions: newPrescriptions,
              prescriptions_times: newPrescriptionTimes,
              prescriptions_dosages_mg: newPrescriptionDosages
          }
      );
  } catch (error) {
      throw new Error(error);
  }
};