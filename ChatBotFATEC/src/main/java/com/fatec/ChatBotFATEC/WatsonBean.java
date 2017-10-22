package com.fatec.ChatBotFATEC;

import java.io.IOException;

import java.util.Map;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.watson.developer_cloud.conversation.v1.ConversationService;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageRequest;
import com.ibm.watson.developer_cloud.conversation.v1.model.MessageResponse;

@WebServlet(name = "watson")
public class WatsonBean extends HttpServlet {
	ConversationService service = new ConversationService(ConversationService.VERSION_DATE_2016_07_11);
	Map<String, Object> context = null;

	public static void main(String[] args) {

	}

	private static final long serialVersionUID = 1L;

	public WatsonBean() {
		super();
		service.setUsernameAndPassword("5a42b20b-9d7a-40af-9b8f-847b7bddca12", "jkiNtWtqnxdI");
	}

	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
		String parameter = req.getParameter("nome");
		MessageResponse testeWatson = testeWatson(parameter);
		res.setContentType("text/plain");
		res.getWriter().println(testeWatson.toString());
	}

	public MessageResponse testeWatson(String msg) {

		String workspaceId = "805cd55c-0bb5-4540-89a9-8b2f263d1c63";

		MessageRequest newMessage = new MessageRequest.Builder().inputText(msg).context(context).build();
		MessageResponse response = service.message(workspaceId, newMessage).execute();
		context = response.getContext();
		return response;

	}

}
