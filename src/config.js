import Chatkit from '@pusher/chatkit-client';

const tokenProvider = new Chatkit.TokenProvider({
	url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/2f021b0b-776d-4a64-ae3c-9cfbca24a412/token'
});

const chatManager = new Chatkit.ChatManager({
	instanceLocator: 'v1:us1:2f021b0b-776d-4a64-ae3c-9cfbca24a412',
	userId: '1',
	tokenProvider: tokenProvider
});

export{tokenProvider,chatManager};
