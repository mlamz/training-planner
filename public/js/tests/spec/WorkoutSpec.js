define(['../../models/workout'], 
  function(Workout) {
    describe("Workout", function() {

		it("should have /workout as urlRoot", function() {
			var workout = new Workout();

			expect(workout.urlRoot).toEqual('/workout');
		});

		it("should return /workout for url if it is new", function() {
			var workout = new Workout();

			expect(workout.url()).toEqual('/workout');
		});

		it("should return /workout/1 for url if it has an id of 1", function() {
			var workout = new Workout({ _id : 1 });

			expect(workout.url()).toEqual('/workout/1');
		});
      });
  }
)

