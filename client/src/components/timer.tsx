import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { User } from "@shared/schema";
import { formatTimer, calculateTimeDifference } from "@/lib/timer-utils";

interface TimerProps {
  user?: User;
}

export default function Timer({ user }: TimerProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!user) {
    return (
      <Card className="bg-secondary/30 border-border">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground mb-3 text-center">
            Carregando...
          </p>
          <div className="timer-display">
            00:00:00:00
          </div>
          <div className="text-xs text-muted-foreground mt-2 text-center">
            dias : horas : minutos : segundos
          </div>
        </CardContent>
      </Card>
    );
  }

  const timeDiff = calculateTimeDifference(user.startDate, currentTime);
  const formattedTime = formatTimer(timeDiff);

  return (
    <Card className="bg-secondary/30 border-border">
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground mb-3 text-center">
          Você está livre da pornografia há:
        </p>
        <div className="timer-display" data-testid="timer-display">
          <span data-testid="timer-days">{String(timeDiff.days).padStart(2, '0')}</span>:
          <span data-testid="timer-hours">{String(timeDiff.hours).padStart(2, '0')}</span>:
          <span data-testid="timer-minutes">{String(timeDiff.minutes).padStart(2, '0')}</span>:
          <span data-testid="timer-seconds">{String(timeDiff.seconds).padStart(2, '0')}</span>
        </div>
        <div className="text-xs text-muted-foreground mt-2 text-center">
          dias : horas : minutos : segundos
        </div>
        
        {timeDiff.days > 0 && (
          <div className="mt-4 text-center">
            <div className="text-sm font-semibold text-primary">
              {timeDiff.days} {timeDiff.days === 1 ? 'DIA' : 'DIAS'} LIMPO
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
