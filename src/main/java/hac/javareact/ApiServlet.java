package hac.javareact;

import com.google.gson.Gson;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@WebServlet(name = "ServletApi", value = "/api/highscores")
public class ApiServlet extends HttpServlet {

    private static final int MAX_HIGHSCORES = 5;
    private static final String SCORES_FILE = "scores.dat";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setHeader("Access-Control-Allow-Origin", "*");

        String path = getServletContext().getRealPath(".");
        List<HighScore> highScores = readScoresFromFile(path);
        List<HighScore> topHighScores = highScores.stream()
                .sorted(Comparator.comparingInt(HighScore::getScore).reversed())
                .limit(MAX_HIGHSCORES)
                .collect(Collectors.toList());

        String json = new Gson().toJson(topHighScores);
        response.getWriter().write(json);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");

        String path = getServletContext().getRealPath(".");
        HighScore newScore = new Gson().fromJson(request.getReader(), HighScore.class);
        List<HighScore> highScores = readScoresFromFile(path);

        Optional<HighScore> existingScore = highScores.stream()
                .filter(score -> score.getName().equals(newScore.getName()))
                .findFirst();

        if (existingScore.isPresent()) {
            HighScore oldScore = existingScore.get();
            if (newScore.getScore() > oldScore.getScore()) {
                highScores.remove(oldScore);
                highScores.add(newScore);
                writeScoresToFile(highScores, path);
                response.getWriter().write("High score updated");
            } else {
                response.getWriter().write("Existing score is higher");
            }
        } else {
            highScores.add(newScore);
            writeScoresToFile(highScores, path);
            response.getWriter().write("New high score added");
        }
    }

    private List<HighScore> readScoresFromFile(String path) throws IOException {
        List<HighScore> highScores;
        try (ObjectInputStream inputStream = new ObjectInputStream(new FileInputStream(path + File.separator + SCORES_FILE))) {
            highScores = new ArrayList<>();
            while (true) {
                try {
                    highScores.add((HighScore) inputStream.readObject());
                } catch (EOFException e) {
                    break;
                }
            }
        } catch (FileNotFoundException e) {
            highScores = new ArrayList<>();
        } catch (IOException | ClassNotFoundException e) {
            throw new IOException("Failed to read scores from file");
        }
        return highScores;
    }

    private void writeScoresToFile(List<HighScore> highScores, String path) throws IOException {
        try (ObjectOutputStream outputStream = new ObjectOutputStream(Files.newOutputStream(Paths.get(path + File.separator + SCORES_FILE)))) {
            for (HighScore score : highScores) {
                outputStream.writeObject(score);
            }
        } catch (IOException e) {
            throw new IOException("Failed to write scores to file");
        }
    }

}
