package hac.javareact;
import java.io.Serializable;

public class HighScore implements Serializable {
    private String name;
    private int score;

    public HighScore(String name, int score) {
        this.name = name;
        this.score = score;
    }

    public HighScore() {
        this("", 0);
    }

    public String getName() { return name; }
    public int getScore() { return score; }
    public void setName(String name) { this.name = name; }
    public void setScore(int score) { this.score = score; }

    public String toString() { return name + " " + score; }
}
