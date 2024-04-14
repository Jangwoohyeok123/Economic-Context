export interface Observer {
	notifyResize(): void;
}

export class Subject {
	private observerCollection: Observer[];

	constructor() {
		this.observerCollection = [];
	}

	registration(observer: Observer) {
		this.observerCollection.push(observer);
	}

	notifyResizeToObservers() {
		this.observerCollection.forEach(observer => {
			observer.notifyResize();
		});
	}
}
