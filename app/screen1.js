import { View, $at } from './view'
import clock from 'clock'

const $ = $at( '#screen-1' );

export class Screen1 extends View {
    // Root view element used to show/hide the view.
    el = $(); // Extract #screen-1 element.

    // Element group.
    time = time();

    // The view state.
    seconds = 0;

    onMount(){
        // Subscribe for the clock...
        clock.granularity = 'seconds';
        
        clock.ontick = () => {
            // Update the state and force render.
            this.seconds++;
            this.render();
        }
    }

    onRender(){
        // Render the elements group.
        this.time( this.seconds );
    }

    onUnmount(){
        // Unsubscribe from the clock
        clock.granularity = 'off';
        clock.ontick = null;
    }

    // Screens may have they own key handlers.
    onKeyUp(){
      console.log( 'Key Up!');
    }
}


// Elements group
function time(){
    const minutes = $( '#minutes' ),
          seconds = $( '#seconds' );

    return secs => {
        minutes.text = ( secs / 60 ) | 0;
        seconds.text = secs % 60;  
    }
}