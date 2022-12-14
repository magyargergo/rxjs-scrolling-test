import { fromEvent, merge, animationFrameScheduler } from 'rxjs';
import { map, debounceTime, skip, auditTime } from 'rxjs/operators';

const scroll$ = fromEvent(window, 'scroll', { passive: true });
const scrolling$ = scroll$.pipe(map(() => true));
const stillScrolling$ = scroll$.pipe(
  skip(1),
  debounceTime(200),
  auditTime(0, animationFrameScheduler),
  map(() => false)
);

merge(scrolling$, stillScrolling$).subscribe((scrolling) => {
  console.log(`scrolling? ${scrolling}`);
});
