import * as lpc from "../lpc/lpc.js";

/**
 * Test server cancellation token used to mock host token cancellation requests.
 * The cancelAfterRequest constructor param specifies how many isCancellationRequested() calls
 * should be made before canceling the token. The id of the request to cancel should be set with
 * setRequestToCancel();
 */
export class ServerCancellationToken implements lpc.server.ServerCancellationToken {
    private currentId: number | undefined = -1;
    private requestToCancel = -1;
    private isCancellationRequestedCount = 0;

    constructor(private logger: lpc.server.Logger, private cancelAfterRequest = 0) {
    }

    setRequest(requestId: number) {
        this.currentId = requestId;

        this.logger.msg(`TestServerCancellationToken:: Cancellation Request id:: ${requestId}`);
    }

    setRequestToCancel(requestId: number) {
        this.logger.msg(`TestServerCancellationToken:: Setting request to cancel:: ${requestId}`);
        this.resetToken();
        this.requestToCancel = requestId;
    }

    resetRequest(requestId: number) {
        this.logger.msg(`TestServerCancellationToken:: resetRequest:: ${requestId} is ${requestId === this.currentId ? "as expected" : `expected to be ${this.currentId}`}`);
        lpc.Debug.assertEqual(requestId, this.currentId, "unexpected request id in cancellation");
        this.currentId = undefined;
    }

    isCancellationRequested() {
        this.isCancellationRequestedCount++;
        // If the request id is the request to cancel and isCancellationRequestedCount
        // has been met then cancel the request. Ex: cancel the request if it is a
        // nav bar request & isCancellationRequested() has already been called three times.
        const result = this.requestToCancel === this.currentId && this.isCancellationRequestedCount >= this.cancelAfterRequest;
        if (result) this.logger.msg(`TestServerCancellationToken:: Cancellation is requested`);
        return result;
    }

    resetToken() {
        this.currentId = -1;
        this.isCancellationRequestedCount = 0;
        this.requestToCancel = -1;
    }
}