// Action types
const LOAD_CLIENTS = '/clients/LOAD_CLIENTS';
const CREATE_CLIENT = '/clients/CREATE_OR_UPDATE_CLIENT'; // also used for update
const REMOVE_CLIENT = '/clients/REMOVE_CLIENT';

// Action creators
const load = (clients) => ({
  type: LOAD_CLIENTS,
  clients,
});

// also used for updating a client
const create = (client) => ({
  type: CREATE_CLIENT,
  client,
});

const remove = (clientId) => ({
  type: REMOVE_CLIENT,
  clientId,
});

// Thunks
// gets all clients associated with logged-in user
export const getClients = (userId) => async (dispatch) => {
  const res = await fetch(`/api/clients/${userId}`);
  const json = await res.json();
  if (res.ok) {
    dispatch(load(json.clients));
  }
};

// create is also used to update if clientId is passed in as second argument
export const createClient = (client, clientIDtoUpdate = null) => async (
  dispatch
) => {
  if (clientIDtoUpdate) {
    // for updating client
    const res = await fetch(`/api/clients/${clientIDtoUpdate}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(client),
    });

    const updatedClient = await res.json();

    if (!res.errors) {
      dispatch(create(updatedClient));
      return updatedClient;
    } else {
      const errors = client;
      return errors;
    }
  } else {
    // for creating client
    const res = await fetch(`/api/clients/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(client),
    });
    const resClient = await res.json();

    if (!resClient.errors) {
      dispatch(create(resClient));
      return resClient;
    } else {
      const errors = resClient;
      return errors;
    }
  }
};

export const deleteClient = (clientId) => async (dispatch) => {
  const res = await fetch(`/api/clients/${clientId}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    dispatch(remove(clientId));
  }
};

export const deleteTest = (clientId, testId) => async (dispatch) => {
  const res = await fetch(`/api/tests/${clientId}/${testId}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    const client = await res.json();
    dispatch(create(client));
  }
};

export const toggleSeen = (clientId, unseenTests) => async (dispatch) => {
  const res = await fetch('/api/tests/toggle-seen', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ clientId, unseenTests }),
  });
  const updatedClient = await res.json();

  if (res.ok) {
    dispatch(create(updatedClient));
    return updatedClient;
  }
};

// Reducer
const initState = {};

const clientReducer = (state = initState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case LOAD_CLIENTS:
      for (let client of action.clients) {
        newState[client.id] = client;
      }
      return newState;
    case CREATE_CLIENT:
      newState[action.client.id] = action.client;
      return newState;
    case REMOVE_CLIENT:
      delete newState[Number(action.clientId)];
      return newState;
    default:
      return newState;
  }
};

export default clientReducer;
