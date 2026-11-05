import styles from "./MaintenanceSchedule.module.css";

interface Interval {
  miles: string;
  items: string;
}

interface MaintenanceScheduleProps {
  title: string;
  intervals: readonly Interval[];
  note: string;
}

/** 30/60/90k timeline. Horizontal on desktop, vertical on phones. */
export function MaintenanceSchedule({ title, intervals, note }: MaintenanceScheduleProps) {
  return (
    <div className={styles.panel}>
      <p className={styles.title}>{title}</p>
      <ol className={styles.track}>
        {intervals.map((i) => (
          <li key={i.miles} className={styles.mark}>
            <b className={styles.miles}>{i.miles}</b>
            <span className={styles.items}>{i.items}</span>
          </li>
        ))}
      </ol>
      <p className={styles.note}>{note}</p>
    </div>
  );
}
