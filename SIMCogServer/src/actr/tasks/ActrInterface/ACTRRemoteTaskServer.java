package actr.tasks.ActrInterface;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.nio.channels.ClosedByInterruptException;
import java.util.Collections;

import org.java_websocket.WebSocket;
import org.java_websocket.drafts.Draft;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import com.thetransactioncompany.jsonrpc2.JSONRPC2Error;
import com.thetransactioncompany.jsonrpc2.JSONRPC2Message;
import com.thetransactioncompany.jsonrpc2.JSONRPC2ParseException;
import com.thetransactioncompany.jsonrpc2.JSONRPC2Request;
import com.thetransactioncompany.jsonrpc2.JSONRPC2Response;
import com.thetransactioncompany.jsonrpc2.server.Dispatcher;

/**
 * Handles web socket activity for the task. Extends WebSocketServer Messages
 * dispatched to task by use of dispatcher
 */
public class ACTRRemoteTaskServer extends WebSocketServer {
	WebSocket myConnection;
	Dispatcher dispatcher;
	SIMCogACTR task;
	int counter = 1;

	public ACTRRemoteTaskServer(InetSocketAddress address, Draft d,
			SIMCogACTR task) {
		super(address, Collections.singletonList(d));
		dispatcher = new Dispatcher();
		dispatcher.register(task);
		this.task = task;
	}

	public ACTRRemoteTaskServer(int port, Draft d, SIMCogACTR task)
			throws UnknownHostException {
		this(new InetSocketAddress(port), d, task);
	}

	@Override
	public void onClose(WebSocket arg0, int arg1, String arg2, boolean arg3) {
		doOnClose();
	}

	public void doOnClose() {
		task.removeAll();
		task.processDisplay();
		SIMCogACTR.storageMap.clear();
		SIMCogACTR.clickAbleItems.clear();
		this.task.output("///////////Closed connection : " + counter);
		counter++;
		if (SIMCogACTR.logData) {
			SIMCogACTR.dataLogger.close();
		}
	}

	@Override
	public void onError(WebSocket arg0, Exception arg1) {
		if (!(arg1 instanceof ClosedByInterruptException)) {
			this.task.output("Error : " + arg1.getStackTrace());
			arg1.printStackTrace();
		}

	}

	@Override
	public void onMessage(WebSocket conn, String message) {
		JSONRPC2Request req = null;
		JSONRPC2Message msg = null;

		try {
			msg = JSONRPC2Message.parse(message);

		} catch (JSONRPC2ParseException e) {
			JSONRPC2Response failed = new JSONRPC2Response(
					JSONRPC2Error.PARSE_ERROR, "Not JSONRPC Object");
			conn.send(failed.toJSONString());
		}

		if (msg instanceof JSONRPC2Request) {
			// If JSON object, send to
			// dispatcher to process
			req = (JSONRPC2Request) msg;
			// JSONRPC2Response resp =
			dispatcher.process(req, null);
			// conn.send(resp.toJSONString()); // Sending Response Message,
			// not needed, only causes slamming of client with meaningless info.
		}
	}

	@Override
	public void onOpen(WebSocket arg0, ClientHandshake arg1) {
		this.myConnection = arg0;
		this.task.output("///////////////////////Opened connection " + counter);
	}

	public SIMCogACTR getTask() {
		return this.task;
	}

	/*
	 * Function to send things to client via server.
	 */
	public void sendViaConnection(String msg) {
		if (myConnection.isOpen()) {
			myConnection.send(msg);
		}

	}

	public void closeConnection() throws ClosedByInterruptException,
			InterruptedException {
		this.releaseBuffers(myConnection);
		try {
			this.stop();
		} catch (IOException | InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
