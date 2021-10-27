__author__ = 'Jacques saraydaryan'

import math

import rospy

from .AbstractShortPath import AbstractShortPath


# import sys
# sys.path.append('../')


class Dijsktra(AbstractShortPath):
    SLEEP_TIME_BEFORE_NEXT_ITERATION = 0.01

    def __init__(self):
        print('')

    def goto(self, source, target, matrix, pub_marker, marker_container):
        # Dictionary that holds the previous node reference
        prev = {}
        # Dictionary that holds node score
        fscore = {}
        # List that holds the nodes to process
        frontier = []
        INF = 999999

        # Condition to stop the path finding algo
        isEnd = False
        print('start processing')

        # Intialisation
        for i in range(len(matrix)):
            for j in range(len(matrix[0])):
                # all nodes receive a score of INF
                fscore[str(i) + '_' + str(j)] = INF
                # all nodes are added to the list to process
                frontier.append({'x': i, 'y': j})
        # score of the start node is set to 0
        fscore[str(source['x']) + '_' + str(source['y'])] = 0
        print('end initialisation phase')

        # while their is node to process or goal is reached (early exit)
        while len(frontier) != 0 and not isEnd:
            # get the node with the lowest score
            current = self.minScore(fscore, frontier)
            current_str = self.cell_str(current)
            print(f"Min is {current_str}: score={fscore[current_str]} matrix={matrix[current['x']][current['y']]}")
            # print('current Node:' + str(current))
            # remove the current node to the node to process list
            frontier.remove(current)
            # create a visual information
            # self.createClosedMarker(current, marker_container)
            self.createClosedMarkerPt(current, marker_container)

            # get the list of the neighbors of the current node
            neighbors = self.getNeighbors(current, matrix)
            # for all neighbors
            for neighbor in neighbors:
                neighbors_str = self.cell_str(neighbor)

                # check that the current node has not already be processed
                if self.isNotProcessed(neighbor, frontier):
                    # create a visual information
                    # self.createFontierUnitMarker(neighbors, marker_array)
                    self.createFontierUnitMarkerPt(neighbor, marker_container)
                    # update the score of the current neighbor with the estimate distance between the neighbors and
                    # the target (heuristic)

                    fscore[neighbors_str] = fscore[current_str] + matrix[neighbor["y"]][neighbor["x"]] + 1
                    # fscore[neighbors_str] = self.get_heuristic(matrix, neighbors, target)

                    # fscore[f'{str(neighbors["x"])}_{str(neighbors["y"])}'] = self.get_heuristic(matrix, neighbors, target)
                    # print('Neighbor:' + str(neighbors) + ', hn:' + str(self.hn(matrix, neighbors, target)))
                    # update precedence of the current neighbor
                    prev[neighbors_str] = current_str
                    # check if the current neighbor is the target
                    if neighbors_str == self.cell_str(target):
                        # end the path computation
                        isEnd = True
            # publish visual information
            pub_marker.publish(marker_container)
            # marker_container = self._create_marker_container()
            # wait before next iteration
            rospy.sleep(self.SLEEP_TIME_BEFORE_NEXT_ITERATION)
        print(str(prev))
        return prev

    def minScore(self, fscore, frontier):
        """ Return the node that has the lowest score, information return like u={'x':5,'y':3}"""
        score_min = 999999
        min_coord = {'x': -1, 'y': -1}
        for n in frontier:
            if fscore[str(n['x']) + '_' + str(n['y'])] <= score_min:
                score_min = fscore[str(n['x']) + '_' + str(n['y'])]
                min_coord = n
        return min_coord

    def getNeighbors(self, currentNode, matrix):
        """ Compute Neighbors of the current point, Return the list of the point neighbors in Cfree"""
        x_c = currentNode['x']
        y_c = currentNode['y']
        neighbors = []
        self.checkAndAdd(neighbors, x_c + 1, y_c, matrix)
        self.checkAndAdd(neighbors, x_c, y_c + 1, matrix)
        self.checkAndAdd(neighbors, x_c - 1, y_c, matrix)
        self.checkAndAdd(neighbors, x_c, y_c - 1, matrix)
        return neighbors

    def checkAndAdd(self, neighbors, x, y, matrix):
        """ Check that the candidate neighbor is valid == not an obstacle, in current bound, add the nieghbor node to
        the node list """
        if 0 < x < self.map_width and 0 < y < self.map_height:
            if matrix[y][x] != self.MAP_OBSTACLE_VALUE:
                neighbors.append({'x': x, 'y': y})
        return neighbors

    def get_heuristic(self, matrix, source, destination):
        """Compute the distance between the given node and the target, the result is an estimation of the distance
        without taking into account obstacles """
        return math.sqrt(math.pow(source['x'] - destination['x'], 2) + math.pow(source['y'] - destination['y'], 2))

    def isNotProcessed(self, v, frontier):
        """ Check if the node is into the list, return boolean """
        return v in frontier

    def cell_str(self, cell):
        return f'{str(cell["x"])}_{str(cell["y"])}'
